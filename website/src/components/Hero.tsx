"use client";

import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import Motion from "components/Motion";
import PortableText from "components/PortableText";
import { PortableTextBlock } from "next-sanity";

export default function Hero({
  header,
}: {
  header: PortableTextBlock | PortableTextBlock[];
}) {
  return (
    <Box
      sx={[
        {
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          flexWrap: { xs: "wrap", lg: "nowrap" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 6,
          py: { xs: 2, md: 0 },
          rowGap: 6,
          minHeight: "calc(100vh - var(--navbar-height))",
          position: "relative",
          backgroundImage: 'url("background.webp")',
          backgroundSize: "cover",
          backgroundPosition: "0 100%",
        },
        // (theme) =>
        //   theme.applyStyles("dark", {
        //   }),
      ]}
    >
      <Container maxWidth="xl" disableGutters sx={{ flex: 1, px: { xs: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            gap: 4,
            pl: { xl: 10 },
            pr: { lg: 6, xl: 10 },
          }}
        >
        <Typography
            sx={{ textAlign: "justify" }}
            component="p"
            variant="h3"
        >
            <a href="https://github.com/locustio/locust">Locust</a>—Write scalable load tests in plain Python using open source 🚗💨
            <br/><br/>

            For Locust-based hosted load testing with detailed reporting, check out <a href="https://learn.microsoft.com/azure/app-testing/load-testing/quickstart-create-run-load-test-with-locust?tabs=portal">Azure Load testing</a>!
      </Typography>
          <PortableText value={header} />
        </Box>
      </Container>
    </Box>
  );
}
