import { IAddress, IBaseModelAttributes } from "../../types";

export interface IProviderAddress extends IBaseModelAttributes, IAddress {
  provider_id: string;
}
