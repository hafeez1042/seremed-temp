import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3.client";

export const s3deleteObject = async (bucketName: string, objectKey: string) => {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: objectKey,
    };

    const command = new DeleteObjectCommand(deleteParams);
    await s3Client.send(command);
  } catch (err) {
    console.error("Error", err);
    throw new Error(err as string);
  }
};
