import { IFieldSchema } from "@quadspire/sd-shared/lib/types/profileForm";
export const sanitizeData = (data: Record<string, any>, schema: IFieldSchema[]): Record<string, any> => {
  const sanitizedData: Record<string, any> = {};

  for (const fieldDef of schema) {
    const fieldName = fieldDef.name;

    if (data.hasOwnProperty(fieldName)) {
      // Use the schema to determine how to sanitize each field
      switch (fieldDef.type) {
        case "text":
        case "textarea":
          sanitizedData[fieldName] = String(data[fieldName]);
          break;
        case "checkbox":
          sanitizedData[fieldName] = Boolean(data[fieldName]);
          break;
        case "select":
          if (Array.isArray(data[fieldName])) {
            sanitizedData[fieldName] = data[fieldName].map(String);
          } else {
            sanitizedData[fieldName] = String(data[fieldName]);
          }
          break;
        // Handle other field types as needed
        default:
          sanitizedData[fieldName] = data[fieldName];
          break;
      }
    } else if (fieldDef.required) {
      // If the field is required but not present in the data, throw an error or handle it as needed
      throw new Error(`Required field '${fieldName}' is missing.`);
    }
  }

  return sanitizedData;
}