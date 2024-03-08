import { IBaseModelAttributes } from "../../types";

export interface IClientService extends IBaseModelAttributes {
  client_id: string;
  service_start_date: Date;
  service_end_date: Date;
}