import { LinkProps, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

interface ILink extends LinkProps {
  children: React.ReactNode;
}

export default function Link({ children, ...props }: ILink) {
  return (
    <MuiLink component={NextLink} {...props}>
      {children}
    </MuiLink>
  );
}
