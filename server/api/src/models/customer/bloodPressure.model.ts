import { DataTypes, Model, Sequelize } from "sequelize";
import { IBloodPressure } from "@seremedi/types/lib/models/customer/bloodPressure"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeBloodPressureModel(sequelize: Sequelize) {
  class BloodPressure extends Model<IBloodPressure> implements IBloodPressure {
    public id!: string;
    public client_vital_id?: string;
    public systolic_mmhg?: number;
    public diastolic_mmhg?: number;
    public position?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  BloodPressure.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_vital_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'client_vitals', // Ensure this matches your actual client vitals table name
        key: 'id',
      },
    },
    systolic_mmhg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    diastolic_mmhg: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "blood_pressures",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return BloodPressure as ModelType<IBloodPressure, IBloodPressure, BloodPressure>;
}

export function initializeBloodPressureModelAssociation(
  BloodPressureModel: ModelType,
  ClientVitalModel: ModelType
) {
  BloodPressureModel.belongsTo(ClientVitalModel, {
    foreignKey: "client_vital_id",
  });
}
