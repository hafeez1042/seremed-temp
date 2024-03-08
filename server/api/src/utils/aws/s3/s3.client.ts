import { S3Client as awsS3Client } from "@aws-sdk/client-s3";

const params = process.env.ACCESS_KEY_ID_AWS ? {
  region: process.env.REGION_AWS,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_AWS!,
    secretAccessKey: process.env._SECRET_ACCESS_KEY_AWS!
  }
} : {
  region: process.env.REGION_AWS
}

export const s3Client = new awsS3Client(params)
