import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./s3.client";

export const generatePresignedPutUrl = async (
  filename: string,
  bucketName: string,
  contentType?: string,
  metadata?: Record<string, string>,
  publicRead?: boolean,
) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: filename,
    ContentType: contentType,
    Metadata: metadata,
    ACL: publicRead ? "public-read" : undefined,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // URL expires in 1 hour
};

export const generateDocumentPresignedPutUrl = (
  fileName: string,
  contentType?: string,
  metadata?: Record<string, string>,
) =>
  generatePresignedPutUrl(
    fileName,
    process.env.S3_DOCUMENTS_BUCKET!,
    contentType,
    metadata,
  );

export const generatePresignedReadUrl = (
  bucketName: string,
  objectKey: string,
) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  return getSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
};
