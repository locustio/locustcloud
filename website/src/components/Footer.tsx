"use client";

import { Box, Typography, Grid, Divider, Container } from "@mui/material";
import Logo from "assets/Logo";
import Link from "components/Link";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const socialLinks = [
  { name: "Twitter", url: "https://x.com/locustio", icon: XIcon },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/locustcloud",
    icon: LinkedInIcon,
  },
  {
    name: "Github",
    url: "https://github.com/locustio/locust",
    icon: GitHubIcon,
  },
];

function Links({
  header,
  linksList,
}: {
  header: string;
  linksList: { text: string; link: string }[];
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 3,
        width: "fit-content",
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
        {header}
      </Typography>
      {linksList.map(({ text, link }, index) => (
        <Link
          typography="body2"
          sx={{ color: "white", textDecoration: "none", mb: 0.5 }}
          underline="none"
          key={`link-list-${header}-${index}`}
          href={link}
        >
          {text}
        </Link>
      ))}
    </Box>
  );
}

function SocialLinks() {
  return (
    <Box sx={{ display: "flex", columnGap: 2 }}>
      {socialLinks.map(({ name, url, icon: Icon }, index) => (
        <Link
          typography="body2"
          sx={{ color: "white", textDecoration: "none", mb: 0.5 }}
          underline="none"
          key={`link-list-${name}-${index}`}
          href={url}
        >
          <Icon />
        </Link>
      ))}
    </Box>
  );
}

export default function Footer() {
  return (
    <Box
    // sx={[
    //   { backgroundColor: "black" },
    //   (theme) =>
    //     theme.applyStyles("dark", {
    //       backgroundColor: "unset",
    //     }),
    // ]}
    >
      <Container
        maxWidth="xl"
        component="footer"
        sx={{
          width: "100%",
          color: "white",
          pt: 6,
          px: { md: 8 },
        }}
      >
        <Grid container spacing={{ xs: 4, md: 30 }}>
          <Grid
            size={{
              xs: 12,
              sm: 5,
            }}
            sx={{ display: "flex", flexDirection: "column", rowGap: 2, mb: 1 }}
          >
            <Logo />
            <Typography
              sx={{ textAlign: "justify" }}
              component="p"
              variant="body2"
            >
              Simple, powerful load testing with hosted load generators and
              detailed reporting.
            </Typography>
            <SocialLinks />
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <Links
              header="Resources"
              linksList={[
                { text: "Blog", link: "/blog" },
                { text: "AI", link: "/ai" },
                { text: "About", link: "/about" },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Links
              header="Support"
              linksList={[
                { text: "Contact Us", link: "mailto:support@locust.cloud" },
              ]}
            />
          </Grid>
        </Grid>

        <Divider
          sx={{ mt: { xs: 3, md: 0 }, borderColor: "rgba(255,255,255,0.1)" }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            py: 2,
          }}
        >
          <Typography variant="caption">
            © 2025 Locust Technologies Inc. | All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
