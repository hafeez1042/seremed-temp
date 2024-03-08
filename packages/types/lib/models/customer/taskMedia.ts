import { IBaseModelAttributes } from "../../types";

export interface ITaskMedia extends IBaseModelAttributes {
  client_task_id: string;
  url: string;
  type: string;
}
