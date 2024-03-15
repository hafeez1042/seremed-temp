import { IBaseModelAttributes } from "../../types";

export interface IClientAddress extends IBaseModelAttributes {
  client_id: string;
  address_id: string;
}
