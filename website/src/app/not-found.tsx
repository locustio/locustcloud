import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" mb={4}>
        {"Sorry, the page you're looking for doesn't exist."}
      </Typography>
      <Button component={Link} href="/" variant="contained" color="primary">
        Go Back Home
      </Button>
    </Box>
  );
}
