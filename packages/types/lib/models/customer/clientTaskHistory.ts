import { IBaseModelAttributes } from "../../types";

export interface IClientTaskHistory extends IBaseModelAttributes {
  action: string;
  prv_value: string;
  value: string;
  client_task_id: string;
}
