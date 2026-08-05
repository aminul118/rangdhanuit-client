import envVars from "@/config/env.config";

const generateQueryUrl = (endpoint: string, query?: Record<string, string>) => {
  const baseUrl =
    typeof window === "undefined" ? envVars.internalApiUrl : envVars.apiUrl;
  const url = new URL(`${baseUrl}${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "undefined" &&
        value !== "null"
      ) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
};

export default generateQueryUrl;
