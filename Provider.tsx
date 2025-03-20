import { TamaguiProvider, Theme } from "tamagui";
import { StepsProvider } from "./contexts/steps-context";
import { ToastProvider } from "@tamagui/toast";
import tamaguiConfig from "./tamagui.config";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
  const theme = "dark_green" // 'light' or 'dark'
  return (
    <TamaguiProvider config={tamaguiConfig} >
      <StepsProvider>
        <Theme name={theme} >
          <ToastProvider>
            {children}
          </ToastProvider>
        </Theme>
      </StepsProvider>
    </TamaguiProvider>
  );
}