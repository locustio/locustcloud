"use client";

import { Box, Container } from "@mui/material";
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
          <PortableText value={header} />
        </Box>
      </Container>

      <Box
        sx={{
          right: 0,
          pl: { xs: 2, lg: 0 },
          width: { xs: "100%", lg: 800 },
          height: "auto",
        }}
      >
        <Motion
          className="motion"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "easeOut",
            duration: 0.4,
          }}
        >
          <Image
            alt="Charts"
            src="/charts.webp"
            style={{ width: "100%", height: "auto", margin: "10px 0" }}
            width={800}
            height={800}
            priority
          />
        </Motion>
      </Box>
    </Box>
  );
}
