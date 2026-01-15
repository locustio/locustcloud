/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Container } from "@mui/material";
import CodeSample from "components/CodeSample/CodeSample";
import CompanyScroller from "components/CompanyScroller/CompanyScroller";
import Features from "components/Features/Features";
import Hero from "components/Hero";
import ReviewsContainer from "components/Reviews/Reviews.container";
import { sanityFetch } from "sanity/client";
import { ICmsPage } from "types/cmsPage.types";

const PAGE_QUERY = `*[_type == "hero"][0]{
  header
}`;

export default async function IndexPage() {
  const { header } = await sanityFetch<ICmsPage>(PAGE_QUERY);

  return (
    <Box>
      <Hero header={header} />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: { xs: 6, md: 16 },
        }}
      >
        {/* <CompanyScroller /> */}
        {/* <Features /> */}
        {/* <CodeSample /> */}
        {/* <ReviewsContainer /> */}
      </Container>
    </Box>
  );
}
