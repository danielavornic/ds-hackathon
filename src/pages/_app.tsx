import type { AppProps } from "next/app";

import { FormProvider, TripProvider, UserProvider } from "@/context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TripProvider>
      <FormProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </FormProvider>
    </TripProvider>
  );
}
