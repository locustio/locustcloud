import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  List,
  ListItem,
  Toolbar,
} from "@mui/material";
import { sanityFetch } from "sanity/client";

import Logo from "assets/Logo";
import NavLink from "components/Navbar/NavLink";
import MobileMenu from "./MobileMenu";
import { INavLink } from "components/Navbar/navbar.types";
import GithubIcon from "assets/Github";

const NAV_LINKS_QUERY = `*[_type == "navLinks"][0]{
  navLinks[]{
    text,
    url,
    external,
    icon
  }
}`;

export default async function Navbar() {
  const { navLinks } = await sanityFetch<{
    navLinks: INavLink[];
  }>(NAV_LINKS_QUERY);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgb(18, 18, 18)",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
        // color: "black",

        height: { md: "var(--navbar-height)" },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            columnGap: 2,
          }}
        >
          <Box sx={{ display: "flex", columnGap: 3 }}>
            <Link
              color="inherit"
              href="/"
              sx={{ display: "flex", alignItems: "center" }}
              underline="none"
            >
              <Logo />
            </Link>
          </Box>
          <Box
            sx={{
              flex: 1,
              mt: 1,
              height: "1px",
              backgroundImage: "linear-gradient(135deg, #b8ee4b, #b8ee4b00)",
            }}
          />
          <List
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              columnGap: 1,
            }}
          >
            {navLinks.map((props, index) => (
              <NavLink key={`nav-item-${index}`} {...props} />
            ))}
            <ListItem>
              <IconButton
                href="https://github.com/locustio/locust"
                rel="noopener noreferrer"
                target="_blank"
                sx={{
                  width: 38,
                  height: 38,
                }}
              >
                <GithubIcon />
              </IconButton>
            </ListItem>

            {/* <ListItem>
              <DarkLightToggle />
            </ListItem> */}
          </List>
          <MobileMenu navLinks={navLinks} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
