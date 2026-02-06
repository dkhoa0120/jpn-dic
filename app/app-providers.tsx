"use client";

import { FC } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type AppProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const AppProviders: FC<AppProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default AppProviders;
