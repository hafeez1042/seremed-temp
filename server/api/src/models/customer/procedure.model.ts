import { DataTypes, Model, Sequelize } from "sequelize";
import { IProcedure } from "@seremedi/types/lib/models/customer/procedure"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeProcedureModel(sequelize: Sequelize) {
  class Procedure extends Model<IProcedure> implements IProcedure {
    public id!: string;
    public name!: string;
    public description?: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Procedure.init(
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
      tableName: "procedures",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Procedure as ModelType<IProcedure, IProcedure, Procedure>;
}

export function initializeProcedureModelAssociation(
  ProcedureModel: ModelType,
  ClientProcedureModel: ModelType
) {
  ProcedureModel.belongsTo(ClientProcedureModel, {
    foreignKey: "procedure_id",
  });
}
