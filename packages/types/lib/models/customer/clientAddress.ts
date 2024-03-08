import { IAddress, IBaseModelAttributes } from "../../types";

export interface IClientAddress extends IBaseModelAttributes, IAddress {
  client_id: string;
}
