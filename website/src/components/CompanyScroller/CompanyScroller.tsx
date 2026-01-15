"use client";
import { Box, SvgIcon, Typography } from "@mui/material";
import Swiper from "components/Swiper";
import AWS from "assets/CompanyScroller/AWS";
import DeliveryHero from "assets/CompanyScroller/DeliveryHero";
import Zalando from "assets/CompanyScroller/Zalando";
import IGGroup from "assets/CompanyScroller/IGGroup";
import Microsoft from "assets/CompanyScroller/Microsoft";

const companies = [
  { name: "AWS", logo: AWS },
  //   { name: "Apple", logo: "/companyscroller/apple.png" },
  { name: "Delivery Hero", logo: DeliveryHero },
  { name: "IG Group", logo: IGGroup },
  // //   { name: "Google", logo: "/companyscroller/google.png" },
  { name: "Microsoft", logo: Microsoft },
  { name: "Zalando", logo: Zalando },
];

const breakpointsConfig = {
  mid: 768,
  large: 1200,
};

const swiperBreakpoints = {
  1: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  [breakpointsConfig.mid]: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
  [breakpointsConfig.large]: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
};

function CompanyCard({ name, logo: Logo }: { name: string; logo: string }) {
  return (
    <SvgIcon
      key={name}
      titleAccess={name}
      sx={[
        {
          fontSize: "100px",
          filter: "grayscale(100%)",
          opacity: 0.8,
          // color: "black",
          transition: "opacity 0.3s ease, filter 0.3s ease",
          "&:hover": {
            filter: "grayscale(0%)",
            opacity: 1,
          },
          userSelect: "unset",
          color: "white",
        },
        // (theme) =>
        //   theme.applyStyles("dark", {
        //   }),
      ]}
    >
      <Logo />
    </SvgIcon>
  );
}

export default function CompanyScroller() {
  return;
  <Box
    sx={{
      textAlign: "center",
      ".swiper": {
        maskImage: `linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)`,
      },
      ".swiper-slide": { my: "auto" },
      ".swiper-wrapper": {
        transitionTimingFunction: "linear !important",
      },
    }}
  >
    <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
      Trusted by
    </Typography>
    <Swiper
      autoplay={{ delay: 1, disableOnInteraction: false }}
      loop
      speed={8000}
      allowTouchMove={false}
      freeMode={{
        enabled: true,
        momentum: false,
      }}
      breakpoints={swiperBreakpoints}
      navigation={false}
      pagination={false}
      Card={CompanyCard}
      slides={companies}
    />
  </Box>;
}
