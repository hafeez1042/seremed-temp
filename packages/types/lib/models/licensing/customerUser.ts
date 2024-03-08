import { IBaseModelAttributes } from "../../types";

export interface ICustomerUser extends IBaseModelAttributes {
  user_id: string;
  customer_id: string;
  status: CustomerUserStatus;
}

export enum CustomerUserStatus {
  Active = "ACTIVE",
  Suspended = "SUSPENDED"
}