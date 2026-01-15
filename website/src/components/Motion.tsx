import { Box, SxProps } from "@mui/material";
import { HTMLMotionProps, motion } from "motion/react";

interface IMotion extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  sx?: SxProps;
}

export default function Motion({ children, ...props }: IMotion) {
  return (
    <Box component={motion.div} className="motion" {...props}>
      {children}
    </Box>
  );
}
