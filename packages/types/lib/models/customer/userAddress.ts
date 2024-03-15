import { IBaseModelAttributes } from "../../types";

export interface IUserAddress extends IBaseModelAttributes {
  user_id: string;
  address_id: string;
}
