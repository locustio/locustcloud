"use client";

import { Drawer, IconButton, List, ListItem } from "@mui/material";
import { useState } from "react";
import NavLink from "components/Navbar/NavLink";
import MenuIcon from "@mui/icons-material/Menu";
import { INavLink } from "components/Navbar/navbar.types";
import GithubIcon from "assets/Github";

interface IMobileMenu {
  navLinks: INavLink[];
}

export default function MobileMenu({ navLinks }: IMobileMenu) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <IconButton
        sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        sx={{ width: 200 }}
        anchor="right"
        onClose={() => setIsMobileMenuOpen(false)}
        open={isMobileMenuOpen}
      >
        <List sx={{ position: "relative", width: 200 }}>
          {navLinks.map((props, index) => (
            <NavLink
              key={`nav-item-${index}`}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              {...props}
            />
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
          {/* <ListItem
            sx={{ position: "absolute", top: 4, right: 0, width: "unset" }}
          >
            <DarkLightToggle />
          </ListItem> */}
        </List>
      </Drawer>
    </>
  );
}
