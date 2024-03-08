import { IAPIResponse } from "./IAPIResponse";
import { RequestHandler } from "express";
import { IQueryStringParams } from "@quadspire/sd-shared/lib/types";

export interface ICRUDController<T = object> {
  create?: RequestHandler<unknown, IAPIV1Response, T>;
  getAll?: RequestHandler<
    unknown,
    IAPIV1Response,
    unknown,
    { query: IQueryStringParams }
  >;
  getById?: RequestHandler<{ id: string }, IAPIV1Response>;
  update?: RequestHandler<{ id: string }, IAPIV1Response, Partial<T>>;
  delete?: RequestHandler<{ id: string }, IAPIV1Response>;
}

export interface IAPIV1Response<D = object[] | object> extends IAPIResponse<D> {
  version: "v1";
}
