import { IBaseModelAttributes } from "../../types";

export interface IUser extends IBaseModelAttributes {
  cognito_user_name: string;
  email: string
}