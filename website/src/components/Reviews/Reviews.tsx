"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Motion from "components/Motion";
import Swiper from "components/Swiper";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";

interface IReview {
  _id: string;
  name: string;
  review: string;
  link?: string;
  role: string;
  company?: string;
}

function ReviewCard({ name, review, role, company }: IReview) {
  return (
    <Box
      sx={{
        position: "relative",
        p: 0.35,
        borderRadius: 3,
        background: `linear-gradient(135deg, #15803d, ${green[300]} 40%, #22c55e 70%, #86efac)`,
        boxShadow: `0 1px 1px rgba(21,128,61,.25)`,
      }}
    >
      <Card
        sx={[
          {
            color: "text.primary",
            borderRadius: 2.5,
            backgroundColor: "#0a0d10",
          },
          // (theme) =>
          //   theme.applyStyles("dark", {
          //   }),
        ]}
      >
        <CardContent sx={{ position: "relative", pt: 5 }}>
          <FormatQuoteRoundedIcon
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontSize: 36,
              opacity: 0.4,
              color: "textSecondary",
            }}
          />
          <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
            {review}
          </Typography>
        </CardContent>

        <Box
          sx={{
            background:
              "linear-gradient(90deg, rgba(21,128,61,.12), transparent)",
            borderTop: "1px solid #1b222c",
          }}
        >
          <CardContent sx={{ py: 2.25 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box>
                <Typography sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
                  {name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {role}
                  {company ? ` at ${company}` : ""}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default function Reviews({ reviews }: { reviews: IReview[] }) {
  return;
  <Box>
    <Typography sx={{ textAlign: "center", mb: 3 }} variant="h4" component="h2">
      What People are Saying About Locust
    </Typography>
    <Motion
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Swiper slides={reviews} Card={ReviewCard} />
    </Motion>
  </Box>;
}
