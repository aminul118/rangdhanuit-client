"use server";

import generateQueryUrl from "@/lib/generateQueryUrl";
import { getCookie } from "@/lib/jwt";
import { revalidate } from "./revalidate";
import { AppError } from "./AppError";

const DEFAULT_TIMEOUT = 15000;

export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string>;
  skipAuth?: boolean;
  timeout?: number;
};

const serverFetchHelper = async <T>(
  endpoint: string,
  options: FetchOptions,
): Promise<T> => {
  const { headers, query, skipAuth, ...rest } = options;
  const url = generateQueryUrl(endpoint, query);

  const makeRequest = async () => {
    let accessToken = null;
    let refreshToken = null;
    if (!skipAuth) {
      accessToken = await getCookie("accessToken");
      refreshToken = await getCookie("refreshToken");
    }

    const bodyContent = rest.body;
    const isFormData =
      bodyContent instanceof FormData ||
      (bodyContent &&
        typeof bodyContent === "object" &&
        "append" in bodyContent &&
        typeof (bodyContent as Record<string, unknown>).append === "function");
    const isString = typeof rest.body === "string";
    const body =
      !isFormData && !isString && rest.body
        ? JSON.stringify(rest.body)
        : rest.body;

    const cookieHeader = [
      accessToken ? `accessToken=${accessToken}` : null,
      refreshToken ? `refreshToken=${refreshToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");

    const timeout = (options as FetchOptions).timeout ?? DEFAULT_TIMEOUT;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      return await fetch(url, {
        ...rest,
        signal: controller.signal,
        next: {
          revalidate: 3600, // Default stale-while-revalidate period (1 hour)
          ...(options as any).next,
        },
        body: body as BodyInit | null,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
          ...(accessToken ? { Authorization: accessToken } : {}),
          ...headers,
        },
      });
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const res = await makeRequest();

  if (!res.ok) {
    let errorData;
    try {
      errorData = await res.json();
    } catch {
      errorData = { message: "Something went wrong", statusCode: res.status };
    }
    throw new AppError(
      errorData.message || "Something went wrong",
      errorData.statusCode || res.status,
      errorData.errorSources,
    );
  }

  const data = await res.json();

  // Trigger revalidation for mutations
  if (["POST", "PUT", "PATCH", "DELETE"].includes(rest.method || "")) {
    const tag = endpoint.startsWith("/")
      ? endpoint.split("/")[1]
      : endpoint.split("/")[0];
    if (tag) {
      // Revalidate the data tag
      revalidate(tag);
    }
  }

  return data as T;
};

export default serverFetchHelper;
