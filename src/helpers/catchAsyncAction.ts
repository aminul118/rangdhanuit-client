import { ApiResponse } from "@/types";
import { AppError } from "./AppError";
import logger from "@/lib/logger";

export const catchAsyncAction = <T, A extends unknown[]>(
  fn: (...args: A) => Promise<ApiResponse<T>>,
) => {
  return async (...args: A): Promise<ApiResponse<T | null>> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      logger.error("Action Error:", error);

      let statusCode = 500;
      let message = "Something went wrong";

      if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
      } else if (error instanceof DOMException && error.name === "AbortError") {
        statusCode = 408;
        message =
          "Request timed out. Please check your connection and try again.";
      } else if (error instanceof Error) {
        message = error.message;
      }

      return {
        success: false,
        message,
        statusCode,
        data: null,
      };
    }
  };
};
