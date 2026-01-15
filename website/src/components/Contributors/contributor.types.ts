import { SanityImageSource } from "sanity/types";

export interface IContributor {
  _id?: string;
  name: string;
  role?: string;
  handle?: {
    tag: string;
    url: string;
  };
  image?: SanityImageSource;
  imageUrl?: string;
}
