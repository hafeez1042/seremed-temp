import { RequestHandler } from "express";
import { SequelizeLicensingDBPoolManager } from "../utils/sequelize/SequelizeLicensingDBPoolManager";

export const initSequelizeMiddleware: RequestHandler = async (req, res, next) => {
  const sequelize = await new SequelizeLicensingDBPoolManager().getSequelize("licensing");
  if(process.env.NODE_ENV === "development") {
    await sequelize.sync()
  }
  // req.db = sequelize;


  next()
}
