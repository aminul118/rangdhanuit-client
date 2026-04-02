/* eslint-disable @typescript-eslint/no-explicit-any */
import serverFetchHelper, { FetchOptions } from "../helpers/serverFetchHelper";

const serverFetch = {
  get: <T = any>(endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper<T>(endpoint, { ...options, method: "GET" }),

  post: <T = any>(endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper<T>(endpoint, { ...options, method: "POST" }),

  put: <T = any>(endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper<T>(endpoint, { ...options, method: "PUT" }),

  patch: <T = any>(endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper<T>(endpoint, { ...options, method: "PATCH" }),

  delete: <T = any>(endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper<T>(endpoint, { ...options, method: "DELETE" }),
};

export default serverFetch;
