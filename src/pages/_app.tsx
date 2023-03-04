import { FormProvider, TripProvider } from "@/context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FormProvider>
      <TripProvider>
        <Component {...pageProps} />
      </TripProvider>
    </FormProvider>
  );
}
