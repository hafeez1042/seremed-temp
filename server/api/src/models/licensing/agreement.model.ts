import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IAgreement } from "@seremedi/types/lib/models/licensing/agreement"; // Adjust import path as necessary
import { modelAttributesOptionalTypes } from "@seremedi/types/lib/types";

interface IAgreementCreationAttributes
  extends Optional<IAgreement, modelAttributesOptionalTypes> {}

export function initializeAgreementModel(sequelize: Sequelize) {
  class Agreement
    extends Model<IAgreement, IAgreementCreationAttributes>
    implements IAgreement
  {
    public id!: string;
    public agreement!: string;
    public agreement_type!: string;
    public version!: string;
    public published_date!: Date;
    public created_at!: Date;
    public updated_at!: Date;
    public created_by!: string;
    public updated_by!: string;
  }

  Agreement.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      agreement: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      agreement_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: "agreements",
      sequelize,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Agreement;
}
