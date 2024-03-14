import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IMedication } from "@seremedi/types/lib/models/customer/medication"; // Correct the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IMedicationCreationAttributes extends Optional<IMedication, modelAttributesOptionalTypes> {}

export function initializeMedicationModel(sequelize: Sequelize) {
  class Medication extends Model<IMedication, IMedicationCreationAttributes> implements IMedication {
    public id!: string;
    public name!: string;
    public instructions?: string;
    public system_defined?: boolean;
    public medication_category_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Medication.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    system_defined: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    medication_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'medication_categories',
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "medications",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return Medication as ModelType<IMedication, IMedicationCreationAttributes, Medication>;
}

export function initializeMedicationModelAssociation(
  MedicationModel: ModelType,
  ClientMedicationModel: ModelType,
  MedicationCategoryModel: ModelType

) {
  MedicationModel.hasMany(ClientMedicationModel, {
    foreignKey: "medication_id",
  });

  MedicationModel.belongsTo(MedicationCategoryModel, {
    foreignKey: "medication_category_id"
  })
}