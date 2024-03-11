import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IProvider } from "@seremedi/types/lib/models/customer/provider"; // Update the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface IProviderCreationAttributes
  extends Optional<IProvider, modelAttributesOptionalTypes> {}

export function initializeProviderModel(sequelize: Sequelize) {
  class Provider
    extends Model<IProvider, IProviderCreationAttributes>
    implements IProvider
  {
    public id!: string;
    public facility_id!: string;
    public primary_address_id?: string;
    public full_name!: string;
    public title?: string;
    public specialty?: string;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Provider.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      facility_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      primary_address_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      specialty: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "providers",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Provider;
}
