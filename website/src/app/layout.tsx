import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { DM_Sans } from "next/font/google";
import {
  Box,
  CssBaseline,
  GlobalStyles,
  InitColorSchemeScript,
  ThemeProvider,
} from "@mui/material";
import { theme } from "theme";
import Navbar from "components/Navbar/Navbar";
import Footer from "components/Footer";
import VisualEditing from "app/visual-editing";
import Script from "next/script";
import PageTracking from "components/PageTracking";
import CookieBanner from "shared/components/CookieBanner";
import { Suspense } from "react";

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata = {
  metadataBase: new URL("https://www.locust.cloud"),
  title: {
    default: "Locust Cloud | Easy load testing with Python",
    template: "Locust Cloud | %s",
  },
  description: {
    default:
      "",
  },
  openGraph: {
    title: "Locust Cloud",
    description:
      "",
    url: "https://www.locust.cloud",
    siteName: "Locust Cloud",
    images: [
      {
        url: "/assets/ogimage.png",
        width: 1200,
        height: 630,
        alt: "Default OG Image",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/ogimage.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <style>
              .motion { opacity: 1 !important; transform: none !important }
            </style>
          `,
          }}
        />
        {/* Cronitor RUM */}
        <script async src="https://rum.cronitor.io/script.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.cronitor = window.cronitor || function() { (window.cronitor.q = window.cronitor.q || []).push(arguments); };
    cronitor('config', { clientKey: 'c7da2ea406ce9c09b9e7ef4760653508' });`,
          }}
        />
      </head>
      <link
        rel="shortcut icon"
        href="/assets/favicon-light.png"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="shortcut icon"
        href="/assets/favicon-dark.png"
        media="(prefers-color-scheme: dark)"
      />
      <AppRouterCacheProvider>
        <Suspense>
          <PageTracking />
        </Suspense>
        <GlobalStyles
          styles={{
            html: {
              scrollBehavior: "smooth",
            },
            ":root": {
              "--navbar-height": "70px",
            },
          }}
        />
        <ThemeProvider theme={theme}>
          <CookieBanner />
          <Box
            component="body"
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <CssBaseline />
            <InitColorSchemeScript attribute="class" />
            <Navbar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflowX: "hidden",
              }}
            >
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </AppRouterCacheProvider>
      <VisualEditing />
    </html>
  );
}
