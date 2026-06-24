"use server";

import envVars from "@/config/env.config";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function deleteImage(publicId: string) {
  const accountId = envVars.r2.accountId;
  const accessKeyId = envVars.r2.accessKeyId;
  const secretAccessKey = envVars.r2.secretAccessKey;
  const bucketName = envVars.r2.bucketName;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    console.error("R2 credentials missing");
    return { success: false, error: "Credentials missing" };
  }

  const s3Client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: publicId,
      }),
    );

    return { success: true };
  } catch (error) {
    console.error("Error deleting image from R2:", error);
    return { success: false, error };
  }
}
