import { NextResponse, type NextRequest } from "next/server";
import { tryRefreshToken } from "./services/Auth/refreshToken";
import { handleTokenRefresh, redirectTo, setAuthCookies } from "./services/User/proxy-utils";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  isValidRedirectForRole,
  UserRole,
} from "./services/User/user-access";
import getVerifiedUser from "./services/User/verified-user";

export default async function proxy(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  const isAuthPage = isAuthRoute(pathname);
  const routeOwner = getRouteOwner(pathname);

  // 1) First try with current access token
  let user = await getVerifiedUser(req);
  let refreshHappened = false;
  let updatedTokens: { accessToken: string; refreshToken?: string } | null = null;

  // 2) If access is invalid but refresh exists -> refresh once
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!user && !isAuthPage && refreshToken) {
    // We pass a temporary response to extract the new cookies
    const tempResponse = NextResponse.next();
    const refreshed = await handleTokenRefresh(
      req,
      tempResponse,
      tryRefreshToken,
    );

    if (refreshed?.user) {
      user = refreshed.user;
      refreshHappened = true;
      updatedTokens = refreshed;
    }
  }

  // Create the final response, ensuring modified request headers are passed downstream
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  // If a refresh happened, sync the cookies to the final response
  if (refreshHappened && updatedTokens) {
    setAuthCookies(response, updatedTokens.accessToken, updatedTokens.refreshToken);
  }

  const role = user?.role as UserRole | undefined;

  // 3) Handle Root Route
  if (pathname === "/") return response;

  // 4) Public Auth Pages (guest allowed)
  if (!user && isAuthPage) return response;

  // 5) Logged-in users should not see auth pages
  if (user && isAuthPage) return redirectTo(origin, "/", response);

  // 6) Protect protected routes for guests
  if (!user && routeOwner !== null && pathname !== "/login") {
    const encodedRedirect = encodeURIComponent(pathname);
    return redirectTo(origin, `/login?redirect=${encodedRedirect}`, response);
  }

  // 7) Role-based protection
  if (user && !isValidRedirectForRole(pathname, role!)) {
    return redirectTo(origin, getDefaultDashboardRoute(role!), response);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
