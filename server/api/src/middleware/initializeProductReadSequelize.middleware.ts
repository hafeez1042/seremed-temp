import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { RequestHandler } from "express";
import { SystemRolesEnum } from "../const/roles";
import companyRepository from "../repository/CompanyRepository";
import { SequelizeDBPoolManager } from "../utils/sellerDatabase/SequelizeDBPoolManager";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";

export const initializeProductReadSequelize: RequestHandler<
  {
    companySlug: string;
  },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  // Check that the request contains a token
  if (req.currentUser?.roles) {
    if (!req.currentUser?.roles.includes(SystemRolesEnum.SUPER_ADMIN)) {
      const company = await companyRepository.getBySlug(req.params.companySlug);

      if (!company) throw new NotFoundError();

      if (company.databaseName) {
        const sequelize = await new SequelizeDBPoolManager().getSellerSequelize(
          company.databaseName,
        );
        req.db = sequelize;
      } else {
        throw new BadRequestError("Invalid request");
      }
    }

    next();
  } else {
    throw new NotAuthorizedError("No token provided");
  }
};
