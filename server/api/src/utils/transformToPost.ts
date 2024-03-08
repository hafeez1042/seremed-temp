import { IPartWithDetails } from "@quadspire/sd-shared/lib/types/product";
import {
  IPostProductContent,
  IPostQuoteContent,
} from "@quadspire/sd-shared/lib/types/post";
import { IQuote } from "@quadspire/sd-shared/lib/types/quote";
import { ObjectId } from "mongodb";

export const transformProductToPostContent = (
  part: IPartWithDetails,
  category: string,
  subCategory: string
): IPostProductContent => {
  const postContent: IPostProductContent = {
    title: part.name,
    description: part.description,
    features: part.features,
    medias: part.images
      .map((image) => ({
        url: image.image_url,
        title: image.name,
        order: image.order,
        type: "image", // Assuming all medias are images
      }))
      .sort((a, b) => a.order - b.order), // Sorting medias by order
    specs: [],
    slug: part.slug!,
    category,
    subCategory,
  };

  // Sorting spec groups by order
  const sortedGroups = part.specGroups.sort((a, b) => a.order - b.order);

  sortedGroups.forEach((group) => {
    const specGroup = {
      groupLabel: group.label,
      specs: part.specs
        .filter((spec) => spec.group_id === group.id)
        .sort((a, b) => a.order - b.order) // Sorting specs by order within each group
        .map((spec) => ({
          key: spec.name,
          value: spec.value ?? "N/A",
        })),
    };

    postContent.specs.push(specGroup);
  });

  return postContent;
};

export const transformQuoteToPostContent = (
  quote: IQuote<string | ObjectId>
): IPostQuoteContent => ({
  endDate: quote.endDate,
  startDate: quote.startDate,
  title: quote.title,
  budget: quote.budget,
  currency: quote.currency,
  description: quote.description,
  origin: quote.origin,
});
