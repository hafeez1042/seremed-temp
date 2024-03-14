import { DataTypes, Model, Sequelize } from "sequelize";
import { IMedicationCategory } from "@seremedi/types/lib/models/customer/medicationCategory"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeMedicationCategoryModel(sequelize: Sequelize) {
  class MedicationCategory
    extends Model<IMedicationCategory>
    implements IMedicationCategory
  {
    public id!: string;
    public name!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  MedicationCategory.init(
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
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      sequelize,
      tableName: "medication_categories",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return MedicationCategory as ModelType<
    IMedicationCategory,
    IMedicationCategory,
    MedicationCategory
  >;
}

export function initializeMedicationCategoryModelAssociation(
  MedicationCategoryModel: ModelType,
  MedicationModel: ModelType
) {
  MedicationCategoryModel.hasMany(MedicationModel, {
    foreignKey: "medication_category_id",
  });
}
