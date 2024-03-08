import { IJWTUserData, IUser } from "@quadspire/sd-shared/lib/types/user";
import mongoose from "mongoose";
import { ICompany } from "@quadspire/sd-shared/lib/types/company";
import { Sequelize } from "sequelize";

declare global {
  namespace Express {
    interface Request {
      currentUser: IJWTUserData &
        IUser<mongoose.Types.ObjectId> & { _id: mongoose.Types.ObjectId };
      company?: ICompany<mongoose.Types.ObjectId>;
      jwtData: IJWTUserData;
      db: Sequelize;
    }
  }
}
