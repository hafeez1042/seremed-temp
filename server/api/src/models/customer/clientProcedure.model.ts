import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientProcedure } from "@seremedi/types/lib/models/customer/clientProcedure"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientProcedureModel(sequelize: Sequelize) {
  class ClientProcedure extends Model<IClientProcedure> implements IClientProcedure {
    public id!: string;
    public client_id!: string;
    public procedure_id!: string;
    public provider_id!: string;
    public procedure_date!: Date;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientProcedure.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    procedure_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    procedure_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_procedures",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientProcedure as ModelType<IClientProcedure, IClientProcedure, ClientProcedure>;
}

export function initializeClientProcedureModelAssociation(
  ClientProcedureModel: ModelType,
  ClientModel: ModelType,
  ProcedureModel: ModelType,
  ProviderModel: ModelType,
) {
  ClientProcedureModel.belongsTo(ClientModel, {
    foreignKey: "client_id"
  })

  ClientProcedureModel.belongsTo(ProcedureModel, {
    foreignKey: "procedure_id"
  })

  ClientProcedureModel.belongsTo(ProviderModel, {
    foreignKey: "provider_id"
  })

}

