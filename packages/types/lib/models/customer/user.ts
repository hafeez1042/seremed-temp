import { IBaseModelAttributes } from "../../types";

export interface IUser extends IBaseModelAttributes {
  cognito_user_name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  primary_address_id: string;
  email: string;
  profile_photo_url: string;
}