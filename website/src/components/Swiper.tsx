"use client";

import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  A11y,
  Keyboard,
} from "swiper/modules";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Box, Container } from "@mui/material";
import type { SwiperOptions } from "swiper/types";

const breakpointsConfig = {
  mid: 768,
  large: 1200,
};

const swiperBreakpoints = {
  1: {
    slidesPerView: 1,
    spaceBetween: 40,
  },
  [breakpointsConfig.mid]: {
    slidesPerView: 2,
    spaceBetween: 50,
  },
  [breakpointsConfig.large]: {
    slidesPerView: 3,
    spaceBetween: 50,
  },
};

const navigationConfig = {
  nextEl: ".swiper-button-next",
  prevEl: ".swiper-button-prev",
};

const paginationConfig = { el: ".swiper-pagination", clickable: true };

interface ISwiper<Slide> extends SwiperOptions {
  Card: React.ElementType;
  slides: Slide[];
}

export default function Swiper<Slide>({
  Card,
  slides,
  pagination = paginationConfig,
  navigation = navigationConfig,
  ...props
}: ISwiper<Slide>) {
  if (!slides) {
    return null;
  }

  return (
    <Box sx={{ position: "relative", "& .swiper-slide": { py: "2px" } }}>
      <Container maxWidth="lg">
        <ReactSwiper
          autoplay={{
            disableOnInteraction: true,
            delay: 5000,
            pauseOnMouseEnter: true,
          }}
          breakpoints={swiperBreakpoints}
          centeredSlides
          loop
          modules={[Autoplay, FreeMode, Navigation, Pagination, A11y, Keyboard]}
          keyboard={{ enabled: true }}
          navigation={navigation}
          pagination={pagination}
          {...props}
        >
          {slides.map((slide, index) => {
            return (
              <SwiperSlide key={`slide-${index}`}>
                {(props) => <Card {...slide} {...props} />}
              </SwiperSlide>
            );
          })}
        </ReactSwiper>
      </Container>
      {pagination && (
        <Box
          className="swiper-pagination"
          sx={{
            position: "static",
            ".swiper-pagination-bullet": {
              width: 10,
              height: 10,
              backgroundColor: "grey.400",
              opacity: 1,
              transition: "background-color 0.3s",
            },
            ".swiper-pagination-bullet-active": {
              backgroundColor: "#22c55e",
            },
          }}
        />
      )}
      {navigation && (
        <>
          <Box
            className="swiper-button-next"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              color: "#22c55e",
              backgroundColor: (theme) => theme.vars?.palette.background.paper,
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              "&::after": {
                fontSize: "20px",
              },
            }}
          />
          <Box
            className="swiper-button-prev"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              backgroundColor: (theme) => theme.vars?.palette.background.paper,
              justifyContent: "center",
              color: "#22c55e",
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              "&::after": {
                fontSize: "20px",
              },
            }}
          />
        </>
      )}
    </Box>
  );
}
