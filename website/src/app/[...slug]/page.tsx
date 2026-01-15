import { Box, Container } from "@mui/material";
import ClientCalculator, {
  ICalculatorProps,
} from "components/ClientCalculator";
import GridLayout, { IGridLayoutProps } from "components/GridLayout";
import Plans, { IPlansProps } from "components/Plans/Plans";
import PortableText from "components/PortableText";
import { sanityFetch } from "sanity/client";
import { ICmsPage } from "types/cmsPage.types";
import type { Metadata } from "next";

export const dynamicParams = false;

const CMS_PAGE_QUERY = `*[
  _type == "cmsPage" && slug.current == $slug
  ][0]{
  header,
  modules[] {
    ...,
    cloudPricing->{
      pricingCards[]->{
        ...,
        features[]{feature->{"key": key.current, label, tooltip}, value}
      }
    },
    premPricing->{
      pricingCards[]->{
        ...,
        features[]{feature->{"key": key.current, label, tooltip}, value}
      }
    },
    gridModules[] {
        ...,
        body[] {
        ...,
        _type == "image" => {
          ...,
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          }
        }
      }
    }
  }
}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const segments = (await params).slug ?? [];
  const path = segments.join("/");
  const canonical = `/${path}` || "/";

  const data = await sanityFetch<ICmsPage>(
    `
    *[_type == "cmsPage" && slug.current == $path][0]{
      seo{
        title,
        description,
        twitterCard,
        ogImage{ asset->{ url } },
        noIndex,
        noFollow
      },
    }
  `,
    { path }
  );

  if (!data) {
    return {
      title: "Not found",
      robots: { index: false, follow: false },
    };
  }

  const {
    seo: { title, description, noIndex, noFollow, ogImage },
  } = data;

  return {
    title: title,
    description,
    robots:
      noIndex || noFollow ? { index: noIndex, follow: noFollow } : undefined,
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    other: data._updatedAt ? { "last-modified": data._updatedAt } : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(
    `*[_type == "cmsPage" && defined(slug.current)]{
      "slug": slug.current
    }`
  );

  return slugs.map(({ slug }) => ({
    slug: slug.split("/"),
  }));
}

export default async function CMSPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const data = await sanityFetch<ICmsPage>(CMS_PAGE_QUERY, {
    slug: (await params)?.slug?.[0],
  });

  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", rowGap: 4, my: 4 }}
    >
      <Box sx={{ maxWidth: 1000 }}>
        <PortableText sx={{ mb: 4 }} value={data.header} />
      </Box>

      {data.modules.map(({ _type, ...props }, index) => (
        <Box key={`cms-module-${index}`}>
          {_type === "grid" && <GridLayout {...(props as IGridLayoutProps)} />}
          {_type === "calculator" && (
            <ClientCalculator {...(props as ICalculatorProps)} />
          )}
          {_type === "pricing" && <Plans {...(props as IPlansProps)} />}
        </Box>
      ))}
    </Container>
  );
}
