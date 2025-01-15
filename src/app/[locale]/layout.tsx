import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import Providers from "@/providers";
import LoginLayout from "@/components/layouts/LoginLayout";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["cyrillic"] });

interface Props {
    children: any;
    params: any;
}

export default function RootLayout({ children, params: { locale } }: Props) {
    return (
        <html className="light overflow-hidden" lang={locale}>
            <head>
                <link rel="icon" href="/images/top-logo.svg" sizes="any" />
            </head>
            <body className={`${inter.className}`}>
                <ToastContainer
                    position="bottom-right"
                    autoClose={false}
                    hideProgressBar={true}
                    newestOnTop={false}
                    draggable={false}
                    // pauseOnVisibilityChange
                    closeOnClick
                    pauseOnHover
                    toastClassName="custom-toast"
                />
                <Providers>
                    <LoginLayout params={{ locale }}>{children}</LoginLayout>
                </Providers>
            </body>
        </html>
    );
}
