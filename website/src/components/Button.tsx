import React from "react";
import { Button as MuiButton, ButtonProps, SxProps } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

type CustomVariants = "gradient" | "cta";

interface IButton extends Omit<ButtonProps, "variant"> {
  variant: CustomVariants | ButtonProps["variant"];
}

export default function Button({ variant, sx, ...props }: IButton) {
  const buttonStyles = {
    gradient: {
      ...sx,
      position: "relative",
      display: "block",
      overflow: "hidden",
      color: "white",
      backgroundImage:
        "linear-gradient(to right, oklch(62.7% 0.194 149.214), #15803d)",
      backgroundSize: "200% 100%",
      backgroundPosition: "0% 0%",
      transition: "background-position .35s ease",
      "&:hover": {
        backgroundPosition: "100% 0%",
        boxShadow:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
    },
    cta: [
      (theme) => ({
        ...sx,
        borderWidth: 1,
        borderStyle: "solid",
        color: theme.vars?.palette.text.primary,
        borderColor: theme.vars?.palette.text.primary,
        // "&:hover": {
        //   bgcolor: grey[100],
        // },
        "&:hover": {
          bgcolor: blueGrey[900],
        },
      }),
      // (theme) =>
      //   theme.applyStyles("dark", {
      //   }),
    ],
  } as ButtonProps["sx"];

  const customVariant = (buttonStyles as Record<string, string>)[
    variant as CustomVariants
  ];

  return (
    <MuiButton
      {...props}
      variant={customVariant ? undefined : (variant as ButtonProps["variant"])}
      sx={(customVariant || sx) as SxProps}
    />
  );
}
