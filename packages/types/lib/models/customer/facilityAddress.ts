import { IAddress, IBaseModelAttributes } from "../../types";

export interface IFacilityAddress extends IBaseModelAttributes, IAddress {
  facility_id: string;
}
