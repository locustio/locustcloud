import { Container, Typography } from "@mui/material";
import Contributors from "components/Contributors/Contributors";

export const metadata = {
  title: "About Us",
  description:
    "Our awesome engineers at Locust Cloud have a combined over 40 years of experience in load testing in a wide range of industries",
  openGraph: {
    description:
      "Our awesome engineers at Locust Cloud have a combined over 40 years of experience in load testing in a wide range of industries",
  },
};

export default function AboutPage() {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography component="h1" variant="h4">
        About Us
      </Typography>

      <Contributors />
    </Container>
  );
}
