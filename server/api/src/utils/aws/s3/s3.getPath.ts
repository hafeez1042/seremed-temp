export const generateDocumentName = (
  userType: "customer" | "seller",
  documentType: string,
  id: string,
  fileName: string
) => `documents/${userType}/${id}/${documentType}/${fileName}`;

/**
 * @description based on this url lambda function is extracting seller id and product,
 * make sure to update lambda function when chnaging the url
 * @param companyId id of the seller
 * @param productId product id
 * @param fileName file name
 * @param type image or document
 * @returns string
 */
export const generateProductName = (
  companyId: string,
  productId: number,
  fileName: string,
  type: "images" | "documents" = "images"
) =>
  `products/${companyId}/${productId}/${type}/${new Date().getTime()}_${fileName}`;

export const generateQuoteDocumentName = (
  companyId: string,
  quoteId: string,
  fileName: string,
  type: "images" | "documents" = "documents"
) =>
  `quotes/${companyId}/${quoteId}/${type}/${new Date().getTime()}_${fileName}`;
