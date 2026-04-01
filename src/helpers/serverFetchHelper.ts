"use server";

import generateQueryUrl from "@/lib/generateQueryUrl";
import { getCookie } from "@/lib/jwt";
import { revalidateTag } from "next/cache";
import { AppError } from "./AppError";

export type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  query?: Record<string, string>;
};

const serverFetchHelper = async <T>(
  endpoint: string,
  options: FetchOptions,
): Promise<T> => {
  const { headers, query, ...rest } = options;
  const url = generateQueryUrl(endpoint, query);

  const makeRequest = async () => {
    const accessToken = await getCookie("accessToken");

    const isFormData = rest.body instanceof FormData;
    const isString = typeof rest.body === "string";
    const body =
      !isFormData && !isString && rest.body ? JSON.stringify(rest.body) : rest.body;

    return fetch(url, {
      ...rest,
      body: body as BodyInit | null,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(accessToken
          ? {
              Cookie: `accessToken=${accessToken}`,
              Authorization: accessToken,
            }
          : {}),
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
    const tag = endpoint.split("/")[1];
    if (tag) {
      revalidateTag(tag, "max");
    }
  }

  return data as T;
};

export default serverFetchHelper;
