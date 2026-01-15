import { Box, List, SxProps, Typography } from "@mui/material";
import {
  PortableText as BasePortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import Link from "components/Link";
import Image from "next/image";
import { urlFor } from "sanity/client";
import CodeBlock from "components/CodeBlock";
import { grey, orange } from "@mui/material/colors";
import ReactPlayer from "react-player";

const components: PortableTextComponents = {
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => (
      <Typography
        variant="body1"
        component="strong"
        sx={{ fontWeight: "bold", fontSize: "inherit" }}
      >
        {children}
      </Typography>
    ),
    link: ({ value, children }) => (
      <Link href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
    highlight: ({ children }) => (
      <Box component="span" sx={{ color: "var(--mui-palette-accent)" }}>
        {children}
      </Box>
    ),
    code: ({ children }) => (
      <Typography
        component="code"
        variant="subtitle2"
        sx={{
          color: orange[500],
          fontFamily: "monospace",
          backgroundColor: grey[900],
          padding: "2px 3px 1px",
          borderRadius: 1,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          wordBreak: "normal",
          fontVariantLigatures: "none",
          tabSize: 4,
        }}
      >
        {children}
      </Typography>
    ),
  },
  block: {
    h1: ({ children }) => (
      <Typography fontWeight={500} sx={{ my: 1 }} component="h1" variant="h3">
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography sx={{ my: 1 }} component="h2" variant="h4">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography sx={{ my: 1 }} component="h3" variant="h5">
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography sx={{ my: 1 }} component="h4" variant="h5">
        {children}
      </Typography>
    ),
    h5: ({ children }) => (
      <Typography sx={{ my: 1 }} component="h5" variant="h5">
        {children}
      </Typography>
    ),
    h6: ({ children }) => (
      <Typography sx={{ my: 1 }} component="h6" variant="h5">
        {children}
      </Typography>
    ),
    normal: ({ children }) => (
      <Typography variant="body1">{children}</Typography>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <List
        component="ul"
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          listStyleType: "disc",
          "& li": { ml: 2 },
        }}
      >
        {children}
      </List>
    ),
    number: ({ children }) => (
      <List
        component="ol"
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 1,
          listStyleType: "list-item",
          "& li": { ml: 2 },
        }}
      >
        {children}
      </List>
    ),
  },
  types: {
    image: ({ value }) => {
      const { asset, alt, caption } = value;
      const height = asset.metadata?.dimensions?.height || 1200;
      const width = asset.metadata?.dimensions?.width || 800;

      return (
        <Box component={caption ? "figure" : "div"} sx={{ margin: 0 }}>
          <Box
            sx={{
              position: "relative",
              aspectRatio: `${width} / ${height}`,
              width: `min(100%, ${width}px)`,
              // width: "100%",
            }}
          >
            <Image
              src={urlFor(asset)?.url() as string}
              alt={alt || ""}
              sizes="100vw"
              style={{
                objectFit: "contain",
                objectPosition: "left",
              }}
              fill
            />
          </Box>
          {caption && (
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", mt: 1 }}
              component="figcaption"
            >
              <PortableText value={caption} />
            </Typography>
          )}
        </Box>
      );
    },
    code: ({ value }) => (
      <CodeBlock
        language={value.language}
        customStyle={{ paddingRight: 0, paddingLeft: 0 }}
      >
        {value.code}
      </CodeBlock>
    ),
    youtube: ({ value }) => (
      <Box sx={{ width: "100%", aspectRatio: "16 / 9" }}>
        <ReactPlayer width="100%" height="100%" src={value.url} />
      </Box>
    ),
  },
};

export default function PortableText({
  value,
  sx = {},
}: {
  value: PortableTextBlock | PortableTextBlock[];
  sx?: SxProps;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      <BasePortableText value={value} components={components} />
    </Box>
  );
}
