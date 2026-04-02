"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import serverFetch from "@/lib/server-fetch";
import { ContactFormValues } from "@/zod/contact";
import { ApiResponse } from "@/types";
import { IContact } from "@/types/contact.types";

export const contactAction = catchAsyncAction(
  async (data: ContactFormValues): Promise<ApiResponse<IContact>> => {
    return await serverFetch.post<ApiResponse<IContact>>("/contacts", {
      body: data,
    });
  },
);
