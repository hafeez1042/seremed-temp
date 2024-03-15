import { IBaseModelAttributes } from "../../types";

export interface IOffice extends IBaseModelAttributes {
  name: string;
  timezone: string;
  address_id: string;
}
