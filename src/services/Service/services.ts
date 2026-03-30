"use server";

import envVars from "@/config/env.config";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getServices = async (query?: Record<string, string>) => {
  const params = new URLSearchParams(query);
  const res = await fetch(`${envVars.apiUrl}/services?${params.toString()}`, {
    next: {
      tags: ["services"],
    },
  });
  return res.json();
};

export const getServiceBySlug = async (slug: string) => {
  const res = await fetch(`${envVars.apiUrl}/services/slug/${slug}`, {
    next: {
      tags: ["services", slug],
    },
  });
  return res.json();
};

export const getServiceById = async (id: string) => {
  const res = await fetch(`${envVars.apiUrl}/services/${id}`, {
    next: {
      tags: ["services", id],
    },
  });
  return res.json();
};

export const createService = async (formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${envVars.apiUrl}/services`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const data = await res.json();

  if (res.ok) {
    revalidateTag("services");
  }

  return data;
};

export const updateService = async (id: string, formData: FormData) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${envVars.apiUrl}/services/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const data = await res.json();

  if (res.ok) {
    revalidateTag("services");
    revalidateTag(id);
  }

  return data;
};

export const deleteService = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(`${envVars.apiUrl}/services/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  const data = await res.json();

  if (res.ok) {
    revalidateTag("services");
  }

  return data;
};
