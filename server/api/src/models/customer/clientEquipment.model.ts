import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientEquipment } from "@seremedi/types/lib/models/customer/clientEquipment"; // Correct the import path as needed
import { ModelType } from "../../types/types";

export function initializeClientEquipmentModel(sequelize: Sequelize) {
  class ClientEquipment extends Model<IClientEquipment> implements IClientEquipment {
    public id!: string;
    public client_id?: string;
    public equipment_id?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientEquipment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id',
      },
    },
    equipment_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'equipment',
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_equipment",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientEquipment as ModelType<IClientEquipment, IClientEquipment, ClientEquipment>;
}


export function initializeClientEquipmentModelAssociation(
  ClientEquipmentModel: ModelType,
  ClientModel: ModelType,
  EquipmentModel: ModelType
) {
  ClientEquipmentModel.belongsTo(ClientModel, {
    foreignKey: "client_id",
  });

  ClientEquipmentModel.belongsTo(EquipmentModel, {
    foreignKey: "equipment_id",
  });
}