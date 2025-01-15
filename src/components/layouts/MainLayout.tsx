"use client";
import NavList from "@/components/header/NavList";
import Header from "@/components/header/page";
import Sidebar from "@/components/sidebar";
import Loader from "@/components/spinner/Loader";
import Providers from "@/providers";
import { NextIntlClientProvider } from "next-intl";
import { FC, ReactNode, Suspense, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import { useAppDispatch } from "@/hooks/helpers/useAppDispatch";
import { useAppSelector } from "@/hooks/helpers/useAppSelector";
import InProcessModal from "../InProcessModal";
import { setSidebarView } from "@/providers/redux/slices/navbarSlice";
import { addKeyTranslation } from "@/data/translation";
import { setNewWord } from "@/providers/redux/slices/translation";
import { useMutation } from "@tanstack/react-query";
import get from "lodash.get";
import useGetTranslationMessages from "@/hooks/api/useGetTranslationMessages";

const MainLayout: FC<{ children: ReactNode; locale: string }> = ({
    children,
    locale,
}) => {
    const dispatch = useAppDispatch();
    const totalMessages = useAppSelector((store) => store.translation.messages);
    const currentMessages = totalMessages?.[locale] || {};

    const dataSt = useAppSelector((state) => state.navbar?.sidebarView);

    useGetTranslationMessages();

    // TODO implement it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addKeyTranslationMutate = useMutation({
        mutationFn: addKeyTranslation,
        mutationKey: ["add-key"],
        onSuccess: ({ data }) => {
            const key = get(data, "result.data[0].key");
            dispatch(setNewWord({ [key]: "" }));
        },
    });

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_ENV === "LOCAL") {
            // TODO TEMP fix
            console.error = () => {};
            console.warn = () => {};
        }
    }, []);

    return (
        <Providers>
            <NextIntlClientProvider
                locale={locale}
                messages={currentMessages}
                getMessageFallback={(e: any) => {
                    if (e.key in currentMessages && !e.key) {
                        return;
                    }

                    // setTimeout(() => {
                    //     addKeyTranslationMutate.mutate([{ key: e.key }]);
                    // }, 3000);
                    return e.key;
                }}
                onError={() => {}}
            >
                <div className="h-vh-100 flex bg-white overflow-hidden">
                    <Sidebar />
                    <div
                        className={`flex flex-col flex-grow flex-shrink bg-white overflow-hidden`}
                        onClick={
                            dataSt
                                ? () => dispatch(setSidebarView(false))
                                : null
                        }
                    >
                        <Header />
                        <NavList />
                        <div className="layout-content relative">
                            <Suspense
                                fallback={
                                    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
                                        <Loader
                                            color="green"
                                            className="h-12 w-12"
                                        />
                                    </div>
                                }
                            >
                                {children}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </NextIntlClientProvider>

            {/* NOTE this is warning modal to display the desired part is in under construction */}
            <InProcessModal />
        </Providers>
    );
};

export default MainLayout;
