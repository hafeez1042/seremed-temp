import { IBaseModelAttributes } from "../../types";

export interface IClientCaregiver extends IBaseModelAttributes {
  client_service_id: string;
  /**
   * User id
   */
  caregiver_id: string;
  status: string;
}
