"use client";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Calculator from "shared/components/Calculator";

export interface ICalculatorProps {
  title: string;
}

export const CALENDAR_LINK = "/get-started";

export default function ClientCalculator({ title }: ICalculatorProps) {
  const router = useRouter();

  return (
    <Box sx={{ my: 8, textAlign: "center" }}>
      <Calculator
        onPricingRequestClick={() => router.push(CALENDAR_LINK)}
        title={title}
        callback={(plan) =>
          router.push(`https://app.locust.cloud/signup?plan=${plan}`)
        }
      />
    </Box>
  );
}
