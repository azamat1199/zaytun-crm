"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState, FC, ReactNode } from "react";
import {
    QueryClient,
    QueryClientProvider as TanStackProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface QueryClientProviderProps {
    children: ReactNode;
}

const QueryClientProvider: FC<QueryClientProviderProps> = ({ children }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetching immediately on the client
                        staleTime: 60 * 1000,
                        retry: 1,
                    },
                },
            }),
    );

    return (
        <TanStackProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </TanStackProvider>
    );
};

export default QueryClientProvider;
