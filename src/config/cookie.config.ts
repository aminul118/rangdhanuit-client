import envVars from "./env.config";

const baseCookieOption = {
  httpOnly: true,
  secure: envVars.nodeEnv === "production",
  sameSite: "lax" as const,
  domain:
    envVars.nodeEnv === "production"
      ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".rangdhanuit.com"
      : "localhost",
  path: "/",
} as const;

export default baseCookieOption;
