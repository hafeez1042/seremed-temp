import { IBaseModelAttributes } from "../../types";

export interface IClientHistoryReport extends IBaseModelAttributes {
  client_id?: string;
  report_data?: string;
  access_password?: string;
}
