import { BaseRepository } from "../BaseRepository";
import { IUser } from "@seremedi/types/lib/models/licensing/user"
import { initializeUserModel, IUserCreationAttributes } from "../../models/licensing/user.model";
import { Sequelize } from "sequelize";

export class UserRepository extends BaseRepository<IUserCreationAttributes, IUser> {
  constructor(sequelize: Sequelize) {
    const UserModel = initializeUserModel(sequelize);

    super(UserModel);
  }
}
