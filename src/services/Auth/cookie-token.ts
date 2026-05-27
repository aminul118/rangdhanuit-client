"use server";

import { cookies } from "next/headers";
import baseCookieOption from "@/config/cookie.config";
import envVars from "@/config/env.config";

const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies();

  (await cookieStore).set("accessToken", accessToken, {
    ...baseCookieOption,
    maxAge: Number(envVars.jwt.accessTokenMaxAge),
  });
};

const setRefreshToken = async (refreshToken: string) => {
  const cookieStore = await cookies();

  (await cookieStore).set("refreshToken", refreshToken, {
    ...baseCookieOption,
    maxAge: Number(envVars.jwt.refreshTokenMaxAge),
  });
};

const removeAccessToken = async () => {
  const cookieStore = await cookies();

  (await cookieStore).delete({
    name: "accessToken",
    path: baseCookieOption.path,
    domain: baseCookieOption.domain,
  });
};

const removeRefreshToken = async () => {
  const cookieStore = await cookies();

  (await cookieStore).delete({
    name: "refreshToken",
    path: baseCookieOption.path,
    domain: baseCookieOption.domain,
  });
};

export {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
};
