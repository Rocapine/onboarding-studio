import { TamaguiProvider, Theme } from "tamagui";
import { StepsProvider } from "./contexts/steps-context";
import { ToastProvider } from "@tamagui/toast";
import tamaguiConfig from "./tamagui.config";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient()

export const Provider = ({ children }: { children: ReactNode }) => {
  const theme = "dark_green" // 'light' or 'dark'

  return (
    <QueryClientProvider client={queryClient}>

      <TamaguiProvider config={tamaguiConfig} >
        <StepsProvider>
          <Theme name={theme} >
            <ToastProvider>
              {children}
            </ToastProvider>
          </Theme>
        </StepsProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}