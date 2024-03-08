import { IBaseModelAttributes } from "../../types";

export interface IClientRefusal extends IBaseModelAttributes {
  document_url?: string;
  document_type?: string;
  client_refusal_type_id?: string;
}
