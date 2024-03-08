import { IBaseModelAttributes } from "../../types";

export interface IUserRole extends IBaseModelAttributes {
  user_id: string;
  role_id: string;
}