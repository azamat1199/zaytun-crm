"use client";
import { getRefreshToken, logout } from "@/data/auth";
import { TranslationFrontOptionsType } from "@/data/translation";
import { mappedFrontServerTranslationLangs } from "@/utils/language";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import get from "lodash.get";
import { Cookies } from "react-cookie";
// import { cookies } from 'next/headers'

const axiosCommonHeaderConfig = {
    "Content-Type": "application/json",
};

const cookie = new Cookies();

// Define the structure of a retry queue item
interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

// Flag to prevent multiple token refresh requests
let isRefreshing = false;

const wrapWithInterceptor = (request: AxiosInstance) => {
    request.interceptors.request.use((config) => {
        const accessToken = cookie.get("accessToken", { path: "/" });

        const locale = cookie.get("NEXT_LOCALE") as TranslationFrontOptionsType;

        if (!config.url?.includes("refresh")) {
            config.headers["Accept-Language"] =
                mappedFrontServerTranslationLangs[locale] || "ru";

            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const controller = new AbortController();

        if (!accessToken || accessToken === "undefined") {
            controller.abort();
        }

        return {
            ...config,
            signal: controller.signal,
        };
    });

    // Add a response interceptor
    request.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        async function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const originalRequest = error.config;

            if (
                error.response &&
                error.response?.status === 401 &&
                cookie.get("refreshToken")
            ) {
                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        const res = await getRefreshToken();
                        const accessToken = get(
                            res,
                            "data.result.data.access_token",
                        );
                        const refreshToken = get(
                            res,
                            "data.result.data.refresh_token",
                        );

                        // Update the request headers with the new access token
                        error.config.headers["Authorization"] =
                            `Bearer ${accessToken}`;

                        cookie.set("accessToken", accessToken, { path: "/" });
                        cookie.set("refreshToken", refreshToken, { path: "/" });
                        // Retry all requests in the queue with the new token
                        refreshAndRetryQueue.forEach(
                            ({ config, resolve, reject }) => {
                                request
                                    .request(config)
                                    .then((response) => resolve(response))
                                    .catch((err) => reject(err));
                            },
                        );

                        // Clear the queue
                        refreshAndRetryQueue.length = 0;

                        // Retry the original request
                        return request(originalRequest);
                    } catch (e) {
                        logout();
                        window.location.pathname = "/";

                        refreshAndRetryQueue.length = 0;
                    } finally {
                        isRefreshing = false;
                    }
                }

                return new Promise<void>((resolve, reject) => {
                    refreshAndRetryQueue.push({
                        config: originalRequest,
                        resolve,
                        reject,
                    });
                });
            }
            return Promise.reject(error);
        },
    );

    return request;
};

const hrRequest = wrapWithInterceptor(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_HR_SERVICE,
        headers: axiosCommonHeaderConfig,
    }),
);

const frontOfficeRequest = wrapWithInterceptor(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_FRONT_OFFICE,
        headers: axiosCommonHeaderConfig,
    }),
);
const crmRequest = wrapWithInterceptor(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_CRM_SERVICE,
        headers: axiosCommonHeaderConfig,
    }),
);
const historyRequest = wrapWithInterceptor(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_HISTORY_SERVICE,
        headers: axiosCommonHeaderConfig,
    }),
);

const fileRequest = wrapWithInterceptor(
    axios.create({
        baseURL: process.env.NEXT_PUBLIC_FILE_VIEW,
        headers: axiosCommonHeaderConfig,
    }),
);

export {
    crmRequest,
    fileRequest,
    frontOfficeRequest,
    historyRequest,
    hrRequest,
};
