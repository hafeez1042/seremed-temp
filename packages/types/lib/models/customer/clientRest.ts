import { IBaseModelAttributes } from "../../types";

export interface IClientRest extends IBaseModelAttributes {
  client_task_id: string;
  value_mins: number;
}
