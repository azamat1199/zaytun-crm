"use client";
import { Breadcrumbs } from "@/components/breadcrumbs/BreadCrumbs";
import cx from "classnames";
import { useTranslations } from "next-intl";
import { WarningIcon } from "@zaytun/components";
import "./index.css";

interface ContentLayoutProps {
    children: React.ReactNode;
    title?: string;
    rightActions?: React.ReactNode;
    currentBreadCrumb?: {
        path: string;
        label: string;
    }[];
    loading?: boolean;
    isError?: boolean;
    divider?: boolean;
    breadCrumbs?: boolean;
    overflowHidden?: boolean;
    breadCrumbOption?: boolean;
}

function ContentLayout({
    children,
    title,
    rightActions,
    currentBreadCrumb,
    loading,
    isError,
    divider,
    breadCrumbs = true,
    overflowHidden,
    breadCrumbOption,
}: ContentLayoutProps) {
    const t = useTranslations();

    return (
        <div
            className={cx(
                "content-layout-wrapper w-full",
                { "p-8 !pt-6": breadCrumbs },
                "overflow-x-hidden",
            )}
        >
            {breadCrumbs && (
                <div
                    className={cx({
                        "mb-8": breadCrumbs || title,
                    })}
                >
                    <Breadcrumbs
                        currentBreadCrumb={currentBreadCrumb}
                        option={breadCrumbOption}
                    />
                </div>
            )}
            {!(!title && !rightActions) && (
                <div className="flex justify-between">
                    {title && <p className="h-text-h2-medium">{title}</p>}
                    {rightActions}
                </div>
            )}
            {divider && <hr className="mt-4 bg-[#CDD4DF]" />}
            <div
                className={cx("flex-1 flex flex-col", {
                    "mt-[24px]": title,
                    "overflow-hidden": overflowHidden,
                })}
            >
                {loading && (
                    <div className="flex flex-1 justify-center items-center">
                        <p className="text-[18px] font-semibold text-gray-700">
                            {t("loading_data")}
                        </p>
                    </div>
                )}
                {!loading && isError && (
                    <div className="content-layout-error">
                        <WarningIcon />
                        <p className="text-[24px] font-semibold text-gray-700">
                            {t("could_not_load_the_date")}
                        </p>
                    </div>
                )}
                {!loading && !isError && children}
            </div>
        </div>
    );
}

export default ContentLayout;
