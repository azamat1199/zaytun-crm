import React from "react";
import { Breadcrumbs as BreadcrumbsDefault } from "@material-tailwind/react";
// import { useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./breadcrumbs.css";
import cx from "classnames";

export function Breadcrumbs({ currentBreadCrumb = [], option }) {
    // const t = useTranslations();
    const pathname = usePathname();
    const [crumbs, setCrumbs] = useState({
        parent: "",
        list: [],
    });
    useEffect(() => {
        const lists = pathname.slice(1).split("/");
        setCrumbs({
            parent: lists.slice(1)[0],
            list: currentBreadCrumb,
            pathname: lists.slice(1).join("/"),
        });
    }, []);

    return (
        <BreadcrumbsDefault className="bg-transparent font-medium p-0">
            <p className={`pointer-events-none text-text-secondary`}>
                {crumbs.parent}
            </p>
            {crumbs.list &&
                Array.isArray(crumbs.list) &&
                crumbs.list.map((item, index) => {
                    const isActive =
                        `/${crumbs.parent}/${crumbs.pathname}` ===
                        `/${crumbs.parent}/${crumbs.list.slice(1, index + 1).join("/")}`;
                    let handleItem = item?.label;
                    if (option?.order && option?.order - 1 === index) {
                        handleItem = option?.title;
                    }
                    return (
                        <a
                            key={item}
                            href={`/${crumbs?.parent}/${item?.path}`}
                            className={cx("breadcrumbs-link", {
                                "bg-border-soft text-text-base": isActive,
                            })}
                        >
                            {handleItem}
                            {/* {!isActive && (ignoreTranslate ? handleItem : t(handleItem))}*/}
                            {/* {isActive &&*/}
                            {/*  (currentBreadCrumb*/}
                            {/*    ? currentBreadCrumb*/}
                            {/*    : ignoreTranslate*/}
                            {/*      ? handleItem*/}
                            {/*      : t(handleItem))}*/}
                        </a>
                    );
                })}
        </BreadcrumbsDefault>
    );
}
