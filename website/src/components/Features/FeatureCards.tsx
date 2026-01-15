"use client";

import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import Motion from "components/Motion";
import { IFeature } from "components/Features/features.types";
import DynamicIcon from "components/DynamicIcon";
import PortableText from "components/PortableText";
import { PortableTextBlock } from "next-sanity";

interface IFeaturesSection {
  cards: IFeature[];
  header: PortableTextBlock | PortableTextBlock[];
}

export default function FeaturesSection({ cards, header }: IFeaturesSection) {
  return (
    <Motion
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <PortableText sx={{ mb: 4, textAlign: "center" }} value={header} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        {cards.map(({ name, icon, description }) => (
          <Card
            elevation={3}
            sx={{
              flex: 4,
              borderRadius: 3,
              height: "100%",
              padding: 1,
            }}
            key={`feature-${name}`}
          >
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Box aria-hidden sx={{ mt: 0.5 }}>
                  <DynamicIcon name={icon} />
                </Box>
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle1"
                    sx={{ fontWeight: 700 }}
                  >
                    {name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Motion>
  );
}
