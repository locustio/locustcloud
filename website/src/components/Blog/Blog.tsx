"use client";
import { Box, Container, List, Typography } from "@mui/material";
import { IBlog } from "app/blog/blog.types";
import BlogCard from "components/Blog/BlogCard";

export default function Blog({ blogs }: { blogs: IBlog[] }) {
  return (
    <>
      <Box
        sx={[
          {
            py: { xs: 4, md: 12 },
            gap: 6,
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "0 100%",
            backgroundImage:
              'url("https://cdn.prod.website-files.com/66596d70fa45b7e4c8ec4997/66745ca6b9ec8db77a0a61ff_hero-bg.webp")',
          },
          // (theme) =>
          //   theme.applyStyles("dark", {
          //   }),
        ]}
      >
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: { lg: "50vw" } }}>
            <Typography
              sx={{ mb: 4 }}
              fontWeight={500}
              component="h1"
              variant="h3"
            >
              Learn the ins and outs of load testing with the{" "}
              <Typography
                variant="h3"
                fontWeight={500}
                sx={{ color: "var(--mui-palette-accent)" }}
                component="span"
              >
                Locust blog
              </Typography>
            </Typography>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <List
          sx={{
            display: "grid",
            gridTemplateColumns: { md: "repeat(3, 1fr)" },
            gap: { xs: 4, md: 6 },
          }}
        >
          {blogs.map(({ _id, ...props }) => (
            <BlogCard key={`blog-list-${_id}`} {...props} />
          ))}
        </List>
      </Container>
    </>
  );
}
