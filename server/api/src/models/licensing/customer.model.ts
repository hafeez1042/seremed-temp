import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { ICustomer } from "@seremedi/types/lib/models/licensing/customer"; // Adjust import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from '../../types/types';

interface ICustomerCreationAttributes extends Optional<ICustomer, modelAttributesOptionalTypes> {}

export function initializeCustomerModel(sequelize: Sequelize) {
  class Customer extends Model<ICustomer, ICustomerCreationAttributes> implements ICustomer {
    public id!: string;
    public company_name!: string;
    public detailed_logging!: string;
    public database_name!: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detailed_logging: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      database_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: 'customers',
      sequelize,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Customer as ModelType<ICustomer, ICustomerCreationAttributes, Customer>;
}

export function initializeCustomerModelAssociation(
  CustomerModel: ModelType,
  UserModel: ModelType,
  CustomerUserModel: ModelType,
  LicensesModel: ModelType,
) {
  CustomerModel.belongsToMany(UserModel, {
    through: CustomerUserModel,
    uniqueKey: "customer_id",
  });
  CustomerModel.hasMany(CustomerUserModel, { foreignKey: "customer_id" });
  CustomerModel.hasMany(LicensesModel, { foreignKey: "customer_id" });
}

