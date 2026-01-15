import { sanityFetch } from "sanity/client";
import Cards from "components/Features/FeatureCards";
import { IFeature } from "components/Features/features.types";
import { PortableTextBlock } from "next-sanity";

const FEATURES_QUERY = `*[_type == "features"][0] {
    header,
    features[] {
      name,
      description,
      icon
    }
}`;

export default async function Features() {
  const { header, features } = await sanityFetch<{
    header: PortableTextBlock | PortableTextBlock[];
    features: IFeature[];
  }>(FEATURES_QUERY);

  return <Cards cards={features} header={header} />;
}
