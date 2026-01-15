import { sanityFetch } from "sanity/client";
import { Box, Container, Typography } from "@mui/material";
import Link from "components/Link";
import PortableText from "components/PortableText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PortableTextBlock } from "@portabletext/react";
import type { Metadata } from "next";
import Subscribe from "components/Blog/Subscribe";
import ShareButton from "components/Blog/ShareButton";

const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0] {
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
}`;

interface IBlog {
  title: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  description?: string;
  body: PortableTextBlock | PortableTextBlock[];
  _updatedAt?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await sanityFetch<IBlog>(
    `
    *[_type == "blog" && slug.current == $slug][0]{
      title,
      description,
      "imageUrl": image.asset->url,
      publishedAt,
      _updatedAt
    }
  `,
    { slug }
  );

  if (!data) {
    return {
      title: "Not found",
      robots: { index: false, follow: false },
    };
  }

  const { title, description, imageUrl, publishedAt, _updatedAt } = data;

  const canonical = `/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      publishedTime: publishedAt,
      modifiedTime: _updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: data._updatedAt ? { "last-modified": data._updatedAt } : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(
    `*[_type == "blog" && defined(slug.current)]{
      "slug": slug.current
    }`
  );

  return slugs.map(({ slug }) => ({
    slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const blog = await sanityFetch<IBlog>(BLOG_QUERY, await params);

  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        my: 4,
        px: { md: 18, lg: 26 },
      }}
      maxWidth="lg"
    >
      <Link
        sx={{ display: "flex", alignItems: "center" }}
        underline="none"
        href="/blog"
      >
        <ArrowBackIcon sx={{ height: "15px" }} /> Back to all posts
      </Link>

      <Typography component="h1" variant="h4" sx={{ fontWeight: "bold" }}>
        {blog.title}
      </Typography>
      <PortableText value={blog.body} />
      <Typography color="textSecondary">{`${blog.author} • ${blog.publishedAt}`}</Typography>
      <Box sx={{ display: "flex", columnGap: 2 }}>
        <Subscribe />
        <ShareButton text={blog.title} />
      </Box>
      <Link
        sx={{ display: "flex", alignItems: "center" }}
        underline="none"
        href="/blog"
      >
        <ArrowBackIcon sx={{ height: "15px" }} /> Back to all posts
      </Link>
    </Container>
  );
}
