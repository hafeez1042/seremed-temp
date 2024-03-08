import { IBaseModelAttributes } from "../../types";

export interface IFacility extends IBaseModelAttributes {
  name: string;
  primary_address_id?: string;
}
