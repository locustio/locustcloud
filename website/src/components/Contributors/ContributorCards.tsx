"use client";

import { Easing } from "motion/react";
import { IContributor } from "./contributor.types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  SxProps,
  Typography,
} from "@mui/material";
import Motion from "components/Motion";
import Link from "components/Link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as Easing },
  },
};

export default function ContributorCards({
  cards,
  sx,
}: {
  cards: IContributor[];
  sx?: SxProps;
}) {
  return (
    <Motion
      className="motion"
      initial="hidden"
      variants={containerVariants}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      sx={{ ...sx, display: "grid", gap: 2 }}
    >
      {cards.map(({ _id, imageUrl, name, role, handle }) => (
        <Motion key={`card-${_id}`} variants={cardVariants} className="motion">
          <Card variant="outlined">
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={imageUrl}
                alt={name}
                sx={{ width: 48, height: 48, marginRight: 2 }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="subtitle1">{name}</Typography>
                {role && (
                  <Typography variant="body2" color="text.secondary">
                    {role}
                  </Typography>
                )}
                {handle && (
                  <Link
                    sx={{ color: "var(--mui-palette-accent)" }}
                    variant="body2"
                    color="text.secondary"
                    href={handle.url}
                  >
                    {handle.tag}
                  </Link>
                )}
              </Box>
            </CardContent>
          </Card>
        </Motion>
      ))}
    </Motion>
  );
}
