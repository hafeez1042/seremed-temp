import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IUserAddress } from "@seremedi/types/lib/models/customer/userAddress"; // Correct the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IUserAddressCreationAttributes extends Optional<IUserAddress, modelAttributesOptionalTypes> {}

export function initializeUserAddressModel(sequelize: Sequelize) {
  class UserAddress extends Model<IUserAddress, IUserAddressCreationAttributes> implements IUserAddress {
    public id!: string;
    public user_id!: string;
    public address_id!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }
  UserAddress.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: DataTypes.UUID,
    address_id: DataTypes.UUID,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "user_addresses",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });


  return UserAddress as ModelType<IUserAddress, IUserAddressCreationAttributes, UserAddress>;
}


export function initializeUserAddressModelAssociation(
  UserAddressModel: ModelType,
  UserModel: ModelType,
  AddressModel: ModelType
) {
  UserAddressModel.belongsTo(UserModel, {
    foreignKey: "user_id"
  });
  UserAddressModel.belongsTo(AddressModel, {
    foreignKey: "address_id"
  });
  
}
