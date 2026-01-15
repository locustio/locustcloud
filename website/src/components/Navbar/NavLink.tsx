"use client";

import { Box, ListItem } from "@mui/material";
import Link from "components/Link";
import Image from "next/image";
import { INavLink } from "components/Navbar/navbar.types";
import { urlFor } from "sanity/client";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

const normalizePathname = (path: string) =>
  new URL(path, "http://locust.cloud").pathname;

export default function NavLink({
  text,
  external,
  url,
  icon,
  setIsMobileMenuOpen,
}: INavLink) {
  const pathname = usePathname();
  const isActive =
    pathname !== "/" &&
    normalizePathname(pathname.slice(0, -1)) === normalizePathname(url);

  return (
    <ListItem
      sx={{
        position: "relative",
        whiteSpace: "nowrap",
        padding: 0,
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 4,
        },
      }}
    >
      <Link
        href={url}
        rel={external ? "noopener noreferrer" : undefined}
        target={external ? "_blank" : undefined}
        underline="none"
        color="unset"
        onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        sx={{
          height: icon ? "25px" : undefined,
          width: icon ? "25px" : undefined,
          py: 1,
          px: 2,
        }}
      >
        {icon ? (
          <Image
            src={urlFor(icon)?.width(100).height(100).url() as string}
            alt={text}
            width="25"
            height="25"
          />
        ) : (
          text
        )}
      </Link>
      <Suspense>
        {isActive && (
          <Box
            sx={{
              position: "absolute",
              marginTop: "4px",
              height: "2px",
              width: "100%",
              bottom: -2,
              backgroundColor: "primary.main",
              borderRadius: "2px",
            }}
          />
        )}
      </Suspense>
    </ListItem>
  );
}
