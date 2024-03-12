import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ICustomerUser, CustomerUserStatus } from "@seremedi/types/lib/models/licensing/customerUser"; // Adjust import path as necessary
import { ModelType } from '../../types/types';

interface ICustomerUserCreationAttributes extends Optional<ICustomerUser, 'id' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'> {}

export function initializeCustomerUserModel(sequelize: Sequelize) {
  class CustomerUser extends Model<ICustomerUser, ICustomerUserCreationAttributes> implements ICustomerUser {
    public id!: string;
    public user_id!: string;
    public customer_id!: string;
    public status!: CustomerUserStatus;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  CustomerUser.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(CustomerUserStatus),
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: 'customer_users',
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return CustomerUser as ModelType<ICustomerUser, ICustomerUserCreationAttributes, CustomerUser>;
}

export function initializeCustomerUserModelAssociation(
  CustomerUserModel: ModelType,
  UserModel: ModelType,
  CustomerModel: ModelType
) {
  CustomerUserModel.belongsTo(UserModel, {
    foreignKey: "user_id"
  });
  CustomerUserModel.belongsTo(CustomerModel, {
    foreignKey: "customer_id"
  });
}
