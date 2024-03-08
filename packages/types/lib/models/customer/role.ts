import { IBaseModelAttributes } from "../../types";

export interface IRole extends IBaseModelAttributes {
  priority?: number;
  name: string;
}