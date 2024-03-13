import { DataTypes, Model, Sequelize } from "sequelize";
import { IClientSymptom } from "@seremedi/types/lib/models/customer/clientSymptom"; // Adjust the import path as necessary
import { ModelType } from "../../types/types";

export function initializeClientSymptomModel(sequelize: Sequelize) {
  class ClientSymptom extends Model<IClientSymptom> implements IClientSymptom {
    public id!: string;
    public client_task_id!: string;
    public symptom_id!: string;
    // Base model attributes
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  ClientSymptom.init({
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
    symptom_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'symptoms',
        key: 'id',
      },
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID,
  }, {
    sequelize,
    tableName: "client_symptoms",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  });

  return ClientSymptom as ModelType<IClientSymptom, IClientSymptom, ClientSymptom>;
}

export function initializeClientSymptomModelAssociation(
  ClientSymptomModel: ModelType,
  ClientTaskModel: ModelType,
  SymptomModel: ModelType,
  SymptomQuestionnaireResponseModel: ModelType
) {
  ClientSymptomModel.belongsTo(ClientTaskModel, {
    foreignKey: "client_task_id",
  });
  ClientSymptomModel.belongsTo(SymptomModel, {
    foreignKey: "symptom_id",
  });
  ClientSymptomModel.hasMany(SymptomQuestionnaireResponseModel, {
    foreignKey: "client_symptom_id",
  });
}