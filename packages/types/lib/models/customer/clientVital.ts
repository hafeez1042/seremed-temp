import { IBaseModelAttributes } from "../../types";

export interface IClientVital extends IBaseModelAttributes {
  client_task_id: string;
  vital_id: string;
}
