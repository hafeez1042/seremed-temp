import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IEquipment } from "@seremedi/types/lib/models/customer/equipment"; // Adjust the import path as needed
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";
import { ModelType } from "../../types/types";

interface IEquipmentCreationAttributes
  extends Optional<IEquipment, modelAttributesOptionalTypes> {}

export function initializeEquipmentModel(sequelize: Sequelize) {
  class Equipment
    extends Model<IEquipment, IEquipmentCreationAttributes>
    implements IEquipment
  {
    public id!: string;
    public equipment_category_id?: string;
    public name!: string;
    public description?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Equipment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      equipment_category_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "equipment_categories",
          key: "id",
        },
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
      tableName: "equipments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Equipment as ModelType<
    IEquipment,
    IEquipmentCreationAttributes,
    Equipment
  >;
}

export function initializeEquipmentModelAssociation(
  EquipmentModel: ModelType,
  EquipmentCategoryModel: ModelType,
  ClientEquipmentModel: ModelType
) {
  EquipmentModel.belongsTo(EquipmentCategoryModel, {
    foreignKey: "equipment_category_id",
  });

  EquipmentModel.hasMany(ClientEquipmentModel, {
    foreignKey: "equipment_id",
  });
}
