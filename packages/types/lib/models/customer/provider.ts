import { IBaseModelAttributes } from "../../types";

export interface IProvider extends IBaseModelAttributes {
  facility_id: string;
  primary_address_id?: string;
  full_name: string;
  title?: string;
  specialty?: string;
}
