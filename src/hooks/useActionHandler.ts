'use client';

import { logger } from '@/lib/logger';
import { ApiResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

interface SuccessConfig<T> {
  loadingText?: string;
  message?: string;
  redirectPath?: string;
  cleanUrl?: boolean;
  isRefresh?: boolean;
  onSuccess?: (data?: T) => void;
}

interface ExecuteOptions<T> {
  action: () => Promise<ApiResponse<T>>;
  success?: SuccessConfig<T>;
  errorMessage?: string;
  onError?: (res: ApiResponse<T>) => boolean | void;
}

const useActionHandler = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  /**
   * Universal execution engine for any API action.
   */
  const execute = async <T>({
    action,
    success,
    errorMessage = "Operation failed",
    onError,
  }: ExecuteOptions<T>): Promise<ApiResponse<T> | null> => {
    if (isPending) return null;

    setIsPending(true);
    const toastId = toast.loading(success?.loadingText || "Processing...");

    try {
      const res = await action();
      logger.info("ACTION_RESULT:", res);

      if (res?.success) {
        toast.success(res.message || success?.message || "Success", {
          id: toastId,
        });

        if (success?.onSuccess) success.onSuccess(res.data);

        if (success?.redirectPath) {
          if (success.cleanUrl) {
            router.replace(success.redirectPath);
          } else {
            router.push(success.redirectPath);
          }
        }

        if (success?.isRefresh) {
          router.refresh();
        }

        return res;
      }

      // Handle custom error logic
      const isHandled = onError?.(res);
      if (isHandled) {
        toast.dismiss(toastId);
        return res;
      }

      toast.error(res?.message || errorMessage, { id: toastId });
      return res;
    } catch (error: unknown) {
      logger.error("EXECUTION_EXCEPTION:", error);
      const msg = error instanceof Error ? error.message : errorMessage;
      toast.error(msg, { id: toastId });
      return null;
    } finally {
      setIsPending(false);
    }
  };

  /**
   * Compatibility wrapper for POST actions.
   */
  const executePost = async <T>(options: ExecuteOptions<T>): Promise<boolean> => {
    const result = await execute(options);
    return !!result?.success;
  };

  /**
   * Compatibility wrapper for DELETE actions with a confirmation default.
   */
  const executeDelete = async <T>(options: ExecuteOptions<T>): Promise<boolean> => {
    const result = await execute({
      ...options,
      success: {
        loadingText: "Deleting...",
        isRefresh: true,
        ...options.success,
      }
    });
    return !!result?.success;
  };

  return { execute, executePost, executeDelete, isPending };
};

export default useActionHandler;
