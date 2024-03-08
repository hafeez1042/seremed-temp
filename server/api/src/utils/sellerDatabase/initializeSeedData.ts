import { Model } from "sequelize";
import {
  partClassData,
  partClassSpecOptionData,
  partClassSpecTemplateAttributeData,
  partClassSpecTemplateAttributeGroupData,
} from "../../data/partClassData";
import PartClassModel from "../../models/sellerModels/PartClassModel";
import PartClassSpecOptionModel from "../../models/sellerModels/PartClassSpecOptionsModel";
import PartClassSpecTemplateAttributeGroupModel from "../../models/sellerModels/PartClassSpecTemplateAttributeGroupModel";
import PartClassSpecTemplateAttributeModel from "../../models/sellerModels/PartClassSpecTemplateAttributeModel";
import { systemOptions } from "../../data/systemOptionsData";
import SystemOptionModel from "../../models/sellerModels/SystemOptionModel";

export const initializeSeedData = async () => {
  await insertWithCheck(systemOptions, SystemOptionModel);
  await insertWithCheck(partClassData, PartClassModel);
  await insertWithCheck(partClassSpecOptionData, PartClassSpecOptionModel);
  await insertWithCheck(
    partClassSpecTemplateAttributeGroupData,
    PartClassSpecTemplateAttributeGroupModel
  );
  await insertWithCheck(
    partClassSpecTemplateAttributeData,
    PartClassSpecTemplateAttributeModel
  );
};

async function insertWithCheck(data: any[], model) {
  for (const item of data) {
    await model.findOrCreate({
      where: { id: item.id },
      defaults: item,
    });
  }
}
