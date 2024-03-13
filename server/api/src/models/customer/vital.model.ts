import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IVital } from "@seremedi/types/lib/models/customer/vital"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IVitalCreationAttributes extends Optional<IVital, modelAttributesOptionalTypes> {}

export function initializeVitalModel(sequelize: Sequelize) {
  class Vital extends Model<IVital, IVitalCreationAttributes> implements IVital {
    public id!: string;
    public name?: string;
    public description?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Vital.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "vitals",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Vital as ModelType<IVital, IVitalCreationAttributes, Vital>;
}


export function initializeVitalModelAssociation(
  VitalModel: ModelType,
  ClientVitalModel: ModelType
) {
  VitalModel.hasMany(ClientVitalModel, {
    foreignKey: "vital_id",
  });
}
