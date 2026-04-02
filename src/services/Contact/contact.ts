"use server";

import { catchAsyncAction } from "@/helpers/catchAsyncAction";
import serverFetch from "@/lib/server-fetch";
import { ContactFormValues } from "@/zod/contact.validation";
import { ApiResponse, IContact } from "@/types";

export const contactAction = catchAsyncAction(
  async (data: ContactFormValues): Promise<ApiResponse<IContact>> => {
    return await serverFetch.post("/contacts", {
      body: data,
    });
  },
);
