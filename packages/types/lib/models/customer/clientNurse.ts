import { IBaseModelAttributes } from "../../types";

export interface IClientNurse extends IBaseModelAttributes {
  client_service_id: string;
  /**
   * User id
   */
  nurse_id: string;
  status: string;
}
