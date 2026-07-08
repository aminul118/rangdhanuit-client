export type UserRole = "ADMIN" | "USER" | "SUPER_ADMIN";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "/settings"],
  patterns: [],
};

const superAdminProtectedRoutes: RouteConfig = {
  patterns: [],
  exact: [],
};

const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin(\/|$)/],
  exact: [],
};

const userProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard(\/|$)/],
  exact: [],
};

const isAuthRoute = (pathname: string) => authRoutes.includes(pathname);

const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((p) => p.test(pathname));
};

const getRouteOwner = (
  pathname: string,
): "ADMIN" | "SUPER_ADMIN" | "COMMON" | "USER" | null => {
  if (isRouteMatches(pathname, superAdminProtectedRoutes)) return "SUPER_ADMIN";
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, userProtectedRoutes)) return "USER";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";
  return null;
};

const getDefaultDashboardRoute = (role: string): string => {
  const upperRole = role.toUpperCase();
  if (upperRole === "ADMIN" || upperRole === "SUPER_ADMIN") return "/admin";
  if (upperRole === "USER") return "/dashboard";
  return "/";
};

const isValidRedirectForRole = (path: string, role: string): boolean => {
  const owner = getRouteOwner(path);
  if (owner === null || owner === "COMMON") return true;
  const upperRole = role.toUpperCase();

  // Prevent any admin (ADMIN or SUPER_ADMIN) from accessing USER routes
  if (owner === "USER" && upperRole !== "USER") {
    return false;
  }

  // Prevent users from accessing any admin routes
  if ((owner === "ADMIN" || owner === "SUPER_ADMIN") && upperRole === "USER") {
    return false;
  }

  // SUPER_ADMIN has access to all other protected routes (like ADMIN)
  if (upperRole === "SUPER_ADMIN") return true;

  return owner === upperRole;
};

export {
  adminProtectedRoutes,
  authRoutes,
  commonProtectedRoutes,
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  isRouteMatches,
  isValidRedirectForRole,
  superAdminProtectedRoutes,
  userProtectedRoutes,
};
