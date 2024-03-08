import { IAddress, IBaseModelAttributes } from "../../types";

export interface IUserAddress extends IBaseModelAttributes, IAddress {
  user_id: string;
  
}
