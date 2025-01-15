"use client";
import React, { ReactNode, FC } from "react";
import ReduxProvider from "./redux";
import QueryClientProvider from "./query-client";
// import { StompSessionProvider } from 'react-stomp-hooks';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <ReduxProvider>
            <QueryClientProvider>
                {/* <StompSessionProvider
          // connectHeaders={{Authorization:`Bearer ${cookie.get('accessToken')}`}}
          onConnect={() => console.log('connected ')}
          url={process.env.NEXT_PUBLIC_SOCKET_URL as string}
        > */}
                {children}
                {/* </StompSessionProvider> */}
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default Providers;
