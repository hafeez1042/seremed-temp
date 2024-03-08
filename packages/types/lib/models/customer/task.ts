import { IBaseModelAttributes } from "../../types";

export interface ITask extends IBaseModelAttributes {
  name: string;
  instructions?: string;
  task_type_id?: string;
  check_list?: string;
}
