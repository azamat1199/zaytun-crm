"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/spinner/Loader";
import { Cookies } from "react-cookie";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { logout } from "@/data/auth";
import MainLayout from "./MainLayout";
const locales = ["ru", "uz", "cr"];

const cookie = new Cookies();

interface Props {
    children: any;
    params: any;
}

function LoginLayout({ children, params: { locale } }: Props) {
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();
    const router = useRouter();
    const [renderContent, setRenderContent] = useState(true);

    const clientId = process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_ID;
    const grantType = "authorization_code";
    const redirectUri = process.env.NEXT_PUBLIC_DOMAIN as string;
    const scope = "openid";
    const baseEndpoint = `${process.env.NEXT_PUBLIC_KEY_CLOCK_URL}/protocol/openid-connect/token`;
    const authorizationCode = params.get("code");
    // Validate that the incoming `locale` parameter is valid
    const isValidLocale = locales.some((cur) => cur === locale);

    if (!isValidLocale) notFound();

    useEffect(() => {
        if (
            cookie.get("accessToken") &&
            cookie.get("accessToken") !== "undefined"
        ) {
            setRenderContent(true);
        } else {
            setLoading(false);

            router.push(
                `${process.env.NEXT_PUBLIC_KEY_CLOCK_URL}/protocol/openid-connect/auth?client_id=${process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}`,
            );
        }
    }, [cookie.get("accessToken")]);

    useEffect(() => {
        if (authorizationCode !== null) {
            // loginMutation.mutate({ grantType, code: authorizationCode, scope });
            const requestBody = new URLSearchParams();
            requestBody.append("client_id", clientId as string);
            requestBody.append("grant_type", grantType);
            requestBody.append("code", authorizationCode);
            requestBody.append("scope", scope);
            requestBody.append("redirect_uri", redirectUri);
            requestBody.append(
                "client_secret",
                process.env.NEXT_PUBLIC_KEY_CLOCK_CLIENT_SECRET as string,
            );

            fetch(baseEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: requestBody.toString(),
            })
                .then((response) => response.json())
                .then((data) => {
                    cookie.set("accessToken", data?.access_token, {
                        path: "/",
                    });
                    cookie.set("refreshToken", data?.refresh_token, {
                        path: "/",
                    });
                    router.replace("/", undefined, { shallow: true });
                })
                .catch(() => {
                    logout();
                })
                .finally(() => {});
        } else {
            console.error("Authorization code is null");
        }
    }, [authorizationCode]);

    return (
        <>
            {renderContent ? (
                <>
                    {loading && (
                        <MainLayout locale={locale}>{children}</MainLayout>
                    )}
                </>
            ) : (
                <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                    <Loader color="green" className="h-12 w-12" />
                </div>
            )}
        </>
    );
}

export default LoginLayout;
