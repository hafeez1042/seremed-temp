import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientRefusalType } from "@seremedi/types/lib/models/customer/clientRefusalType"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientRefusalTypeModel(sequelize: Sequelize) {
  class ClientRefusalType
    extends Model<IClientRefusalType>
    implements IClientRefusalType
  {
    public id!: string;
    public name!: string;
    public description?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientRefusalType.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "client_refusal_types",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return ClientRefusalType as ModelType<
    IClientRefusalType,
    IClientRefusalType,
    ClientRefusalType
  >;
}

export function initializeClientRefusalTypeModelAssociation(
  ClientRefusalTypeModel: ModelType,
  ClientRefusalModel: ModelType
) {
  ClientRefusalTypeModel.hasMany(ClientRefusalModel, {
    foreignKey: "client_refusal_type_id",
  });
}
