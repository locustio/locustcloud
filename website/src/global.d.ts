// global.d.ts
export {};

declare global {
  interface Window {
    grecaptcha: {
      widgetId?: number;
      executeAsync: () => Promise<string>;
    };
    gtag: (
      event: string,
      eventType: string,
      eventData: Record<string, string>
    ) => void;
  }
}

declare module "@mui/material/styles" {
  interface PaletteOptions {
    accent: string;
  }
  interface Palette {
    accent: string;
  }
}
