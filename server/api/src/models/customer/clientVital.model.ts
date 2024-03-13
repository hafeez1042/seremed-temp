import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientVital } from "@seremedi/types/lib/models/customer/clientVital"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientVitalModel(sequelize: Sequelize) {
  class ClientVital extends Model<IClientVital> implements IClientVital {
    public id!: string;
    public client_task_id!: string;
    public vital_id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientVital.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_task_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'client_tasks',
        key: 'id',
      },
    },
    vital_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'vitals',
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_vitals",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientVital as ModelType<IClientVital, IClientVital, ClientVital>;
}


export function initializeClientVitalModelAssociation(
  ClientVitalModel: ModelType,
  ClientTaskModel: ModelType,
  VitalModel: ModelType,
  BloodPressureModel: ModelType,
  HeartRateModel: ModelType,
  BodyTemperatureModel: ModelType,
  OxygenSaturationModel: ModelType,
  PainLevelModel: ModelType,
  DrainLevelModel: ModelType,
  AlertnessLevelModel: ModelType
) {
  ClientVitalModel.belongsTo(ClientTaskModel, {
    foreignKey: "client_task_id",
  });
  ClientVitalModel.belongsTo(VitalModel, {
    foreignKey: "vital_id",
  });

  ClientVitalModel.hasOne(BloodPressureModel, {foreignKey: "client_vital_id"})
  ClientVitalModel.hasOne(HeartRateModel, {foreignKey: "client_vital_id"})
  ClientVitalModel.hasOne(BodyTemperatureModel, {foreignKey: "client_vital_id"})
  ClientVitalModel.hasOne(OxygenSaturationModel, {foreignKey: "client_vital_id"})
  ClientVitalModel.hasOne(PainLevelModel, {foreignKey: "client_vital_id"})
  ClientVitalModel.hasOne(DrainLevelModel, {foreignKey: "client_vital_id"})
  ClientVitalModel.hasOne(AlertnessLevelModel, {foreignKey: "client_vital_id"})
}

