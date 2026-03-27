import envVars from './env.config';

const baseCookieOption = {
  httpOnly: true,
  secure: envVars.nodeEnv === 'production',
  sameSite: 'lax' as const,
  // Adjust domain based on your deployment
  domain: envVars.nodeEnv === 'production' ? 'rangdhanu-it.com' : 'localhost',
  path: '/',
} as const;

export default baseCookieOption;
