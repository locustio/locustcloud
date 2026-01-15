"use client";

import { Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Button from "components/Button";

export default function CtaBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        width: { md: "80%" },
        mx: "auto",
        mb: 4,
        height: 300,
        p: 0.35,
        borderRadius: 3,
        background: `linear-gradient(135deg, #15803d, ${green[300]} 40%, #22c55e 70%, #86efac)`,
        boxShadow: `0 1px 1px rgba(21,128,61,.25)`,
        backgroundColor: "#012D18",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          rowGap: 2,
          backgroundColor: "#0a0d10",
          height: "100%",
          width: "100%",
          borderRadius: 2.5,
          p: 1,
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Ready to supercharge your load testing?
        </Typography>
        <Box>
          <Button
            sx={{ mt: 1 }}
            href="https://app.locust.cloud/signup"
            size="large"
            variant="gradient"
          >
            Create free account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
