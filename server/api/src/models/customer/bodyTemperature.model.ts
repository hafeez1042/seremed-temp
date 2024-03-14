import { DataTypes, Model, Sequelize } from "sequelize";
import { IBodyTemperature } from "@seremedi/types/lib/models/customer/bodyTemperature"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeBodyTemperatureModel(sequelize: Sequelize) {
  class BodyTemperature
    extends Model<IBodyTemperature>
    implements IBodyTemperature
  {
    public id!: string;
    public body_temperature_f?: number;
    public client_vital_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  BodyTemperature.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      body_temperature_f: {
        type: DataTypes.FLOAT, // Use FLOAT for decimal values
        allowNull: true,
      },
      client_vital_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "client_vitals",
          key: "id",
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "body_temperatures",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return BodyTemperature as ModelType<
    IBodyTemperature,
    IBodyTemperature,
    BodyTemperature
  >;
}

export function initializeBodyTemperatureModelAssociation(
  BodyTemperatureModel: ModelType,
  ClientVitalModel: ModelType
) {
  BodyTemperatureModel.belongsTo(ClientVitalModel, {
    foreignKey: "client_vital_id",
  });
}
