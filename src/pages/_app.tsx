import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import ResponsiveAppBar from "@/components/Nav";
//Su dung react-query de fetch data,quan ly global valiable
const queryClient = new QueryClient();
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ResponsiveAppBar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
