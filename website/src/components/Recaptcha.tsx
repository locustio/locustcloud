"use client";
import { useColorScheme } from "@mui/material";
import { THEME_MODE } from "constants/theme";
import { useEffect } from "react";

const RECAPTCHA_SCRIPT_URL = `https://www.google.com/recaptcha/api.js?render=explicit`;
const RECAPTCHA_SCRIPT_ID = "recaptcha-key";
const RECAPTCHA_CONTAINER_ID = "recaptcha-container";
const RECAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function Recaptcha() {
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    if (document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      document.getElementById(RECAPTCHA_SCRIPT_ID)?.remove();
    }

    const script = document.createElement("script");
    script.src = RECAPTCHA_SCRIPT_URL;
    script.async = true;
    script.id = RECAPTCHA_SCRIPT_ID;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.grecaptcha?.widgetId || window.grecaptcha?.widgetId === 0) {
        return;
      }

      let resolvePromise: (value: string | PromiseLike<string>) => void;
      window.grecaptcha?.ready(() => {
        window.grecaptcha.widgetId = window.grecaptcha?.render(
          RECAPTCHA_CONTAINER_ID,
          {
            sitekey: RECAPTCHA_SITEKEY,
            size: "invisible",
            theme: colorScheme === THEME_MODE.DARK ? "dark" : "light",
            callback: (token) => resolvePromise(token),
          }
        );
      });

      window.grecaptcha.executeAsync = () =>
        new Promise<string>(async (resolve) => {
          resolvePromise = resolve;
          window.grecaptcha?.reset();
          await window.grecaptcha?.execute(window.grecaptcha.widgetId);
        });
    };

    return () => {
      if (
        window.grecaptcha &&
        (window.grecaptcha.widgetId || window.grecaptcha.widgetId === 0)
      ) {
        window.grecaptcha.widgetId = undefined;
      }
    };
  }, []);

  return (
    <div
      id={RECAPTCHA_CONTAINER_ID}
      style={{
        position: "absolute",
        zIndex: 200,
      }}
    />
  );
}
