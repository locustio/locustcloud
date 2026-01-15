import { Box, ListItem, Typography } from "@mui/material";
import { IBlog } from "app/blog/blog.types";
import Image from "next/image";
import Link from "components/Link";

export default function BlogCard({
  imageUrl,
  title,
  description,
  publishedAt,
  slug,
}: Omit<IBlog, "_id">) {
  return (
    <ListItem
      disablePadding
      sx={{
        "&:hover": { transform: "scale(1.02)" },
        transition: "transform 0.3s ease",
        alignItems: "flex-start",
      }}
    >
      <Link
        width="100%"
        underline="none"
        color="textPrimary"
        href={`/blog/${slug.current}`}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
            aspectRatio: "16 / 10",
            mb: 2,
          }}
        >
          <Box
            component={Image}
            src={imageUrl as string}
            alt={title}
            fill
            sx={{
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </Box>
        <Typography
          component="h2"
          variant="h6"
          sx={{
            my: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: { md: 70 },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ mb: 2 }}
          color="textSecondary"
        >{`${publishedAt}`}</Typography>
        <Typography
          sx={{
            fontWeight: "normal",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          variant="h6"
        >
          {description}
        </Typography>
      </Link>
    </ListItem>
  );
}
