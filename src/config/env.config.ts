const envVars = {
  nodeEnv: process.env.NODE_ENV,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  r2: {
    accountId: process.env.R2_ACCOUNT_ID as string,
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
    bucketName: process.env.R2_BUCKET_NAME as string,
    publicDevUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_DEV_URL as string,
  },

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET as string,
    accessTokenMaxAge: process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAX_AGE,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET as string,
    refreshTokenMaxAge: process.env.NEXT_PUBLIC_REFRESH_TOKEN_MAX_AGE,
  },
};

export default envVars;
