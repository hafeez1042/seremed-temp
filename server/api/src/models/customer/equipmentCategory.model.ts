import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IEquipmentCategory } from "@seremedi/types/lib/models/customer/equipmentCategory"; // Adjust the import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface IEquipmentCategoryCreationAttributes extends Optional<IEquipmentCategory, modelAttributesOptionalTypes> {}

export function initializeEquipmentCategoryModel(sequelize: Sequelize) {
  class EquipmentCategory extends Model<IEquipmentCategory, IEquipmentCategoryCreationAttributes> implements IEquipmentCategory {
    public id!: string;
    public name!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  EquipmentCategory.init({
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
  }, {
    sequelize,
    tableName: "equipment_categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return EquipmentCategory;
}
