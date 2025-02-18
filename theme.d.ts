import type { ExtendTheme } from "@pigment-css/react/theme";

declare module "@pigment-css/react/theme" {
  interface ThemeTokens {
    colors: {
      primary: string;
      secondary: string;
    };
    fontFamily: string;
    fontFeatureSettings: string;
  }

  interface ThemeArgs {
    theme: ExtendTheme<{
      tokens: ThemeTokens;
    }>;
  }
}
