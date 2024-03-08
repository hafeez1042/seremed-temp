import { FindOptions, Op, WhereOptions } from "sequelize";
import {
  IFieldFilter,
  IQueryStringParams,
} from "@quadspire/sd-shared/lib/types";

export const generateSequelizeQuery = (
  params: IQueryStringParams,
  searchFilter?: (q: string) => WhereOptions,
): FindOptions => {
  if (!params) return {};
  let sequelizeQuery: FindOptions = {};

  if (params.q && searchFilter) {
    sequelizeQuery.where = {
      ...sequelizeQuery.where,
      [Op.or]: { ...searchFilter(params.q) },
    };
  }

  if (params.filter) {
    Object.keys(params.filter).forEach((field) => {
      if (!Object.keys(params.filter![field]).length) return;
      sequelizeQuery.where = {
        ...sequelizeQuery.where,
        [field]: convertFieldFilterToSequelize(params.filter![field]),
      };
    });
  }

  if (params.orderBy) {
    sequelizeQuery.order = [[params.orderBy, params.order || "asc"]];
  }

  if (params.limit) {
    sequelizeQuery.limit = params.limit;
  }

  if (params.skip) {
    sequelizeQuery.offset = params.skip;
  }

  return sequelizeQuery;
};

function convertFieldFilterToSequelize(
  filter: IFieldFilter[string],
): FindOptions {
  let sequelizeFilter: FindOptions = {};

  Object.keys(filter).forEach((key) => {
    switch (key) {
      case "startsWith":
        sequelizeFilter[Op.startsWith] = filter.startsWith;
        break;
      case "contains":
        sequelizeFilter[Op.substring] = filter.contains;
        break;
      case "endsWith":
        sequelizeFilter[Op.endsWith] = filter.endsWith;
        break;
      case "eq":
        sequelizeFilter[Op.eq] = filter.eq;
        break;
      case "neq":
        sequelizeFilter[Op.ne] = filter.neq;
        break;
      case "lt":
        sequelizeFilter[Op.lt] = filter.lt;
        break;
      case "lte":
        sequelizeFilter[Op.lte] = filter.lte;
        break;
      case "gt":
        sequelizeFilter[Op.gt] = filter.gt;
        break;
      case "gte":
        sequelizeFilter[Op.gte] = filter.gte;
        break;
      case "in":
        sequelizeFilter[Op.in] = filter.in;
        break;
      case "nin":
        sequelizeFilter[Op.notIn] = filter.nin;
        break;
    }
  });

  return sequelizeFilter;
}
