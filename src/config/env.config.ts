const envVars = {
  nodeEnv: process.env.NODE_ENV,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string,
    googleTagManagerId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string,
  },

  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
    apiSecret: process.env.CLOUDINARY_API_SECRET as string,
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
  },

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET as string,
    accessTokenMaxAge: process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAX_AGE,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET as string,
    refreshTokenMaxAge: process.env.NEXT_PUBLIC_REFRESH_TOKEN_MAX_AGE,
  },
};

export default envVars;
