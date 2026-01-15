"use client";

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PlansTable, { IPricing } from "./PlansTable";

const planTabs = [{ name: "Cloud" }, { name: "On Prem" }];

interface IPricingFeature {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

interface IPricingCard {
  _id?: string;
  name: string;
  price?: number;
  features: IPricingFeature[];
  recommended?: boolean;
  ctaText: string;
  onClick?: () => void;
  ctaLink?: string;
  isLoading?: boolean;
}

export interface IPricingProps {
  pricingCards: IPricingCard[];
}

export interface IPlansProps {
  cloudPricing: { pricingCards: IPricing[] };
  premPricing: { pricingCards: IPricing[] };
}

export default function Plans({ cloudPricing, premPricing }: IPlansProps) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        slotProps={{ indicator: { style: { display: "none" } } }}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          overflow: "unset",
          "& .MuiTab-root": {
            textTransform: "none",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            backgroundColor: "background.paper",
            px: 4,
            borderBottom: "none",
          },
          "& .MuiTabs-scroller": {
            overflow: "unset !important",
          },
          "& .Mui-selected": {
            backgroundColor: "background.default",
            border: "1px solid",
            borderColor: "divider",
            borderBottomColor: "transparent",
            marginBottom: "-1px",
          },
        }}
      >
        {planTabs.map(({ name }) => (
          <Tab key={name} label={name} />
        ))}
      </Tabs>

      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderTop: "none",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: "background.default",
          px: 2,
          py: 4,
        }}
      >
        {planTabs.map(
          ({ name }, index) =>
            value === index && (
              <PlansTable
                name={name}
                pricing={
                  index === 0
                    ? cloudPricing.pricingCards
                    : premPricing.pricingCards
                }
                key={`${name}-plans-tab-${index}-${value}`}
              />
            )
        )}
      </Box>
    </Box>
  );
}
