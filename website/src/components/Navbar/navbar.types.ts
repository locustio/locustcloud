import { SanityImageSource } from "sanity/types";

export interface INavLink {
  text: string;
  url: string;
  external?: boolean;
  icon?: SanityImageSource;
  iconUrl?: string;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
}
