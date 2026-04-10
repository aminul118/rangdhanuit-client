"use server";

import generateQueryUrl from "@/lib/generateQueryUrl";
import { getCookie } from "@/lib/jwt";
import { revalidate } from "./revalidate";
import { AppError } from "./AppError";

export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string>;
  skipAuth?: boolean;
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

    return fetch(url, {
      ...rest,
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
  };

  const res = await makeRequest();
  const data = await res.json();

  if (!res.ok) {
    throw new AppError(
      data.message || "Something went wrong",
      data.statusCode || res.status,
      data.errorSources,
    );
  }

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
