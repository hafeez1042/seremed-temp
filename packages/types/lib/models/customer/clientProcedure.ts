import { IBaseModelAttributes } from "../../types";

export interface IClientProcedure extends IBaseModelAttributes {
  client_id: string;
  procedure_id: string;
  provider_id: string;
  procedure_date: Date;
}