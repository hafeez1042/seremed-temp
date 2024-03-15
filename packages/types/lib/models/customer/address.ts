import { IBaseModelAttributes } from "../../types";

export interface IAddress extends IBaseModelAttributes {
  suit_number?: string;
  apartment_unit_number?: string;
  street_line_1: string;
  street_line_2?: string;
  city?: string;
  county?: string;
  state?: string;
  country: string;
  zip_code?: string;
  phone_number?: string;
  email: string;

  address_type: AddressTypeEnum;
}

export enum AddressTypeEnum {
  Office = "OFFICE",
  Home = "Home",
}
