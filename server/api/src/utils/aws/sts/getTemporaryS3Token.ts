import { AssumeRoleCommand, Credentials, STSClient } from "@aws-sdk/client-sts";

const params = process.env.ACCESS_KEY_ID_AWS ? {
  region: process.env.REGION_AWS,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_AWS!,
    secretAccessKey: process.env._SECRET_ACCESS_KEY_AWS!
  }
} : {
  region: process.env.REGION_AWS
}


const stsClient = new STSClient(params);

export const getTemporaryS3Token = async (sessionName, durationInMinutes = 1): Promise<Credentials> => {
  const params = {
    RoleArn: process.env.AWS_S3_ARN,
    RoleSessionName: sessionName, // This will identify the session
    DurationSeconds: durationInMinutes * 60, // Valid duration in seconds (optional, default is 1 hour, max depends on AWS policy)
  };

  try {
    const command = new AssumeRoleCommand(params);
    const response = await stsClient.send(command);
    if (!response.Credentials) {
      throw new Error('Failed to retrieve credentials');
    }
    return response.Credentials;
  } catch (error) {
    console.error("Error assuming role: ", error);
    throw error;
  }
};


