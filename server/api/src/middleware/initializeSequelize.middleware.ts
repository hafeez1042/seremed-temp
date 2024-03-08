import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { RequestHandler } from "express";
import { SequelizeDBPoolManager } from "../utils/sellerDatabase/SequelizeDBPoolManager";

export const initializeSequelizeMiddleware: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  // Check that the request contains a token
  if (req.currentUser?.roles) {
    if (!req.currentUser?.roles.includes("SystemRolesEnum.SUPER_ADMIN")) {
      const company = req.company!;
      if (company.databaseName) {
        const sequelize = await new SequelizeDBPoolManager().getSellerSequelize(
          company.databaseName,
        );
        req.db = sequelize;
      }
    }

    next();
  } else {
    throw new NotAuthorizedError("No token provided");
  }
};
