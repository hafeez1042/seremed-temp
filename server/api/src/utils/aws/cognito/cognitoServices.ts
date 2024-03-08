import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
  AdminDeleteUserCommand,
  AdminDisableUserCommand,
  AdminResetUserPasswordCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

/**
 * @doc https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/
 */

export class CognitoServices {
  private client = new CognitoIdentityProviderClient({
    region: "us-east-1",
  });

  private poolId = process.env.COGNITO_USER_POOL_ID;

  inviteUser = async (value: IUserInviteType) => {
    const input: AdminCreateUserCommandInput = {
      UserPoolId: this.poolId,
      Username: value.email,
      UserAttributes: [
        {
          Name: "name",
          Value: value.fullName,
        },
        {
          Name: "phone_number",
          Value: value.phoneNumber,
        },
        {
          Name: "email",
          Value: value.email,
        },
        {
          Name: "custom:usertype",
          Value: value.type,
        },
      ],
      TemporaryPassword: value.temporaryPassword,
      ForceAliasCreation: true || false,
      MessageAction: value.messageAction,
      DesiredDeliveryMediums: ["EMAIL"],
    };
    const command = new AdminCreateUserCommand(input);
    const response = await this.client.send(command);

    return response;
  };

  deleteUser = async (userName: string) => {
    const input = {
      // AdminDeleteUserRequest
      UserPoolId: this.poolId,
      Username: userName,
    };
    const command = new AdminDeleteUserCommand(input);
    const response = await this.client.send(command);

    return response;
  };

  disableUser = async (userName: string) => {
    const input = {
      // AdminDisableUserRequest
      UserPoolId: this.poolId,
      Username: userName,
    };
    const command = new AdminDisableUserCommand(input);
    const response = await this.client.send(command);

    return response;
  };

  resetPassword = async (userName: string) => {
    const input = {
      UserPoolId: this.poolId,
      Username: userName,
    };
    const command = new AdminResetUserPasswordCommand(input);
    const response = await this.client.send(command);

    return response;
  };
}

interface IUserInviteType {
  email: string;
  fullName: string;
  phoneNumber: string;
  temporaryPassword?: string;
  resendInvite?: boolean;
  type: "customer" | "seller";
  messageAction?: "RESEND" | "SUPPRESS";
}
