import { NextRequest, NextResponse } from "next/server";
import baseCookieOption from "../../config/cookie.config";
import envVars from "../../config/env.config";
import { type DecodedToken } from "./verified-user";

/**
 * Decodes a JWT token manually to extract the payload.
 * Since this runs in Edge Runtime, atob is available.
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

/**
 * Sets the access and refresh tokens in the response cookies.
 */
export const setAuthCookies = (
  response: NextResponse,
  accessToken: string,
  refreshToken?: string,
) => {
  response.cookies.set("accessToken", accessToken, {
    ...baseCookieOption,
    maxAge: Number(envVars.jwt.accessTokenMaxAge) || 60 * 60 * 24, // 1 day
  });

  if (refreshToken) {
    response.cookies.set("refreshToken", refreshToken, {
      ...baseCookieOption,
      maxAge: Number(envVars.jwt.refreshTokenMaxAge) || 60 * 60 * 24 * 30, // 30 days
    });
  }
};

/**
 * Helper to create a redirect response while preserving cookies from an existing response.
 */
export const redirectTo = (
  origin: string,
  path: string,
  existingResponse?: NextResponse,
) => {
  const redirectResponse = NextResponse.redirect(new URL(path, origin));

  if (existingResponse) {
    existingResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, { ...cookie });
    });
  }

  return redirectResponse;
};

/**
 * Handles the logic for attempted token refresh, updating both
 * response cookies and request headers (for server component visibility).
 */
export const handleTokenRefresh = async (
  req: NextRequest,
  response: NextResponse,
  tryRefreshToken: () => Promise<{
    accessToken: string;
    refreshToken?: string;
  } | null>,
): Promise<{
  accessToken: string;
  refreshToken?: string;
  user: DecodedToken | null;
} | null> => {
  const refreshed = await tryRefreshToken();

  if (refreshed?.accessToken) {
    const { accessToken, refreshToken } = refreshed;

    // Set the new tokens in the response cookies
    setAuthCookies(response, accessToken, refreshToken);

    // Update request headers so Server Components can see the new token in this request
    req.cookies.set("accessToken", accessToken);
    if (refreshToken) req.cookies.set("refreshToken", refreshToken);

    // Sync req.headers for downstream Server Components
    req.headers.set(
      "Cookie",
      [`accessToken=${accessToken}`, refreshToken ? `refreshToken=${refreshToken}` : null]
        .filter(Boolean)
        .join("; "),
    );
    req.headers.set("Authorization", accessToken);

    const user = decodeToken(accessToken);

    return { accessToken, refreshToken, user };
  }

  return null;
};
