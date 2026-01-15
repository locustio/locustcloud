import type { PortableTextBlock } from "@portabletext/react";

export interface ICmsGridModule {
  heading: string;
  body?: PortableTextBlock | PortableTextBlock[];
  image?: string;
  width: number;
}

interface ICmsModule {
  _type: "grid" | "calculator" | "pricing";
  gridModules?: ICmsGridModule[];
}

interface ISeo {
  title: string;
  description: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface ICmsPage {
  header: PortableTextBlock | PortableTextBlock[];
  modules: ICmsModule[];
  seo: ISeo;
  _updatedAt?: string;
}
