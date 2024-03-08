import { IBaseModelAttributes } from "../../types";

export interface IProcedure extends IBaseModelAttributes {
  name: string;
  description?: string;
}
