"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Locales from "@/components/ui-components/extended/Locales";
import RTLLayout from "@/components/ui-components/extended/RTLLayout";
import { JWTProvider as AuthProvider } from "@/contexts/JWTContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "@/store";
import { ConfigProvider } from "@/contexts/ConfigContext";
import NavigationScroll from "@/layout/NavigationScroll";
import ThemeCustomization from "@/themes";
import LoadingScreen from "@/components/ui-components/LoadingScreen";
import { AbilityProvider } from "@/contexts/AbilityContext";

interface Props {
  children: ReactNode;
}

export default function ProviderWrapper({ children }: Props) {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen progress={3} />}
        persistor={persister}
      >
        <QueryClientProvider client={queryClient}>
          <LoadingProvider>
            <AuthProvider>
              <NavigationScroll>
                <ConfigProvider>
                  <ThemeCustomization>
                    <AbilityProvider>
                      <Locales>
                        <RTLLayout>{children}</RTLLayout>
                      </Locales>
                    </AbilityProvider>
                  </ThemeCustomization>
                </ConfigProvider>
              </NavigationScroll>
            </AuthProvider>
          </LoadingProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
