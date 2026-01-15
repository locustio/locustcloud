import { SanityImageSource } from "sanity/types";

export interface IBlog {
  _id: string;
  author: string;
  title: string;
  description: string;
  image: SanityImageSource;
  imageUrl?: string;
  publishedAt: string;
  slug: { current: string };
}
