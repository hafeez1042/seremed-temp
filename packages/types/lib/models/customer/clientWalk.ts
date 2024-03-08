import { IBaseModelAttributes } from "../../types";

export interface IClientWalk extends IBaseModelAttributes {
  client_task_id: string;
  duration_mins?: number;
  distance_miles?: number;
}
