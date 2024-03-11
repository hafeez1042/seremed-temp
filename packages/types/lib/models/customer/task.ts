import { IBaseModelAttributes } from "../../types";

export interface ITask extends IBaseModelAttributes {
  name: string;
  instructions?: string;
  task_type_id?: string;
  /**
   * Check list will be a json data, with check list items and status
   */
  check_list?: string;
}
