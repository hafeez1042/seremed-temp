import { IBaseModelAttributes } from "../../types";

export interface IClient extends IBaseModelAttributes {
  first_name: string;
  middle_name?: string;
  last_name?: string;
  title?: string;
  phone_number?: string;
  date_of_birth?: Date;
  /**
   * Unique id provided by service provider
   */
  client_identification?: string;
  sex?: string;
  emergency_contact_type?: string;
  emergency_phone_number?: string;
  primary_address_id?: string;
}
