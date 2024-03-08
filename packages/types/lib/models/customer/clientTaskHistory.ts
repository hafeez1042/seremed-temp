import { IBaseModelAttributes } from "../../types";

export interface IClientTaskHistory extends IBaseModelAttributes {
  action: string;
  value: string;
  client_task_id: string;
}
