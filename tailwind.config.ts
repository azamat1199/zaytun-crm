/* eslint-disable @typescript-eslint/no-var-requires */
// import  { nextui } from "@nextui-org/react";
import plugin from "tailwindcss/plugin";
import withMT from "@material-tailwind/react/utils/withMT";

const { createThemes } = require("tw-colors");
/** @type {import('tailwindcss').Config} */
const colors = require("./colors.json");
const darkColors = require("./dark-colors.json");

module.exports = withMT({
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./*.{js,ts,jsx,tsx}",
        "./*.stories.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            "2xl": { max: "1535px" },
            // => @media (max-width: 1535px) { ... }

            xl: { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            md: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }
        },
        extend: {
            fontSize: {
                "h1-r": [
                    "2.5rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "3rem",
                        letterSpacing: "-2%",
                    },
                ],
                "h1-m": [
                    "2.5rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "3rem",
                        letterSpacing: "-2%",
                    },
                ],
                "h1-s": [
                    "2.5rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "3rem",
                        letterSpacing: "-2%",
                    },
                ],
                "h2-r": [
                    "2rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "2.5rem",
                        letterSpacing: "-2%",
                    },
                ],
                "h2-m": [
                    "2rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "2.5rem",
                        letterSpacing: "-2%",
                    },
                ],
                "h2-s": [
                    "2rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "2.5rem",
                        letterSpacing: "-2%",
                    },
                ],
                "h3-r": [
                    "1.5rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "2rem",
                        letterSpacing: "0%",
                    },
                ],
                "h3-m": [
                    "1.5rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "2rem",
                        letterSpacing: "0%",
                    },
                ],
                "h3-s": [
                    "1.5rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "2rem",
                        letterSpacing: "0%",
                    },
                ],
                "s-r": [
                    "1.125rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "1.625rem",
                        letterSpacing: "0%",
                    },
                ],
                "s-m": [
                    "1.125rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "1.625rem",
                        letterSpacing: "0%",
                    },
                ],
                "s-s": [
                    "1.125rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "1.625rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-1-r": [
                    "1rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "1.5rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-1-m": [
                    "1rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "1.5rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-1-s": [
                    "1rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "1.5rem",
                        letterSpacing: "0%",
                    },
                ],

                "b-2-r": [
                    "0.875rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "1.375rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-2-m": [
                    "0.875rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "1.375rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-2-s": [
                    "0.875rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "1.375rem",
                        letterSpacing: "0%",
                    },
                ],

                "b-3-r": [
                    "0.75rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "1.25rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-3-m": [
                    "0.75rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "1.25rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-3-s": [
                    "0.75rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "1.25rem",
                        letterSpacing: "0%",
                    },
                ],

                "b-4-r": [
                    "0.625rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "1.125rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-4-m": [
                    "0.625rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "1.125rem",
                        letterSpacing: "0%",
                    },
                ],
                "b-4-s": [
                    "0.625rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "1.125rem",
                        letterSpacing: "0%",
                    },
                ],

                "l-b-1-m": [
                    "1rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "1.5rem",
                        letterSpacing: "0%",
                    },
                ],
                "l-b-1-s": [
                    "1rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "1.5rem",
                        letterSpacing: "0%",
                    },
                ],

                "l-b-2-r": [
                    "0.875rem",
                    {
                        fontWeight: "regular",
                        lineHeight: "1.375rem",
                        letterSpacing: "0%",
                    },
                ],
                "l-b-2-m": [
                    "0.875rem",
                    {
                        fontWeight: "medium",
                        lineHeight: "1.375rem",
                        letterSpacing: "0%",
                    },
                ],
                "l-b-2-s": [
                    "0.875rem",
                    {
                        fontWeight: "semibold",
                        lineHeight: "1.375rem",
                        letterSpacing: "0%",
                    },
                ],
            },
            boxShadow: {
                xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            },
        },
        fontFamily: {
            inter: "'Inter', sans-serif",
        },
    },
    plugins: [
        createThemes({
            light: {
                c_primary: {
                    DEFAULT: "#039855",
                    50: "#EBFAF3",
                    100: "#BAEBD5",
                    200: "#8BD0B1",
                    300: "#56ba8d",
                    400: "#35ad77",
                    500: "#039855",
                    600: "#038a4d",
                    700: "#026c3c",
                    800: "#02542f",
                    900: "#014024",
                },
                c_neutral: {
                    0: "#ffffff",
                    25: "#FCFCFD",
                    50: "#F9FAFB",
                    100: "#F2F4F7",
                    200: "#EAECF0",
                    300: "#CDD4DF",
                    400: "#98A2B3",
                    500: "#667085",
                    600: "#344054",
                    700: "#1D2939",
                    800: "#101828",
                    900: "#0C0F16",
                },
                c_success: {
                    50: "#E7F8F0",
                    100: "#b6e9d1",
                    200: "#92deba",
                    300: "#60CF9B",
                    400: "#41c588",
                    500: "#12b76a",
                    600: "#10a760",
                    700: "#0d824b",
                    800: "#0a653a",
                    900: "#084d2d",
                },
                c_warning: {
                    DEFAULT: "#f79009",
                    50: "#fef4e6",
                    100: "#fdddb3",
                    200: "#fbcc8e",
                    300: "#fab55a",
                    400: "#f9a63a",
                    500: "#f79009",
                    600: "#e18308",
                    700: "#af6606",
                    800: "#884f05",
                    900: "#683c04",
                },
                c_error: {
                    50: "#feeceb",
                    100: "#fac5c1",
                    200: "#f8a9a3",
                    300: "#f5827a",
                    400: "#f36960",
                    500: "#f04438",
                    600: "#da3e33",
                    700: "#aa3028",
                    800: "#84251f",
                    900: "#651d18",
                },
                ["c_blue-gray"]: {
                    50: "#edeff6",
                    100: "#c8cce3",
                    200: "#aeb4d6",
                    300: "#8891c3",
                    400: "#717cb8",
                    500: "#4e5ba6",
                    600: "#475397",
                    700: "#374176",
                    800: "#2b325b",
                    900: "#212646",
                },
                ["c_blue-light"]: {
                    50: "#e7f6fd",
                    100: "#b3e3f9",
                    200: "#8fd6f6",
                    300: "#5cc3f2",
                    400: "#3cb7f0",
                    500: "#0ba5ec",
                    600: "#0a96d7",
                    700: "#0875a8",
                    800: "#065b82",
                    900: "#054563",
                },
                c_blue: {
                    50: "#eaf4ff",
                    100: "#beddfd",
                    200: "#9fccfd",
                    300: "#73b5fc",
                    400: "#58a6fb",
                    500: "#2e90fa",
                    600: "#2a83e4",
                    700: "#2166b2",
                    800: "#194f8a",
                    900: "#133c69",
                },
                c_indigo: {
                    50: "#eff1fe",
                    100: "#CED3FB",
                    200: "#b6bef9",
                    300: "#94a0f6",
                    400: "#808df4",
                    500: "#6071f1",
                    600: "#5767db",
                    700: "#4450ab",
                    800: "#353e85",
                    900: "#282f65",
                },
                c_purple: {
                    50: "#f2effe",
                    100: "#d6ccfd",
                    200: "#c2b3fb",
                    300: "#a690fa",
                    400: "#957bf9",
                    500: "#7a5af7",
                    600: "#6f52e1",
                    700: "#5740AF",
                    800: "#433288",
                    900: "#332668",
                },
                c_pink: {
                    50: "#fdedf8",
                    100: "#fac6ea",
                    200: "#f7aae0",
                    300: "#f483d2",
                    400: "#f16bc9",
                    500: "#EE46BC",
                    600: "#d940ab",
                    700: "#a93285",
                    800: "#832767",
                    900: "#641d4f",
                },
                c_rose: {
                    50: "#feecf0",
                    100: "#fcc3d0",
                    200: "#fba6ba",
                    300: "#f97d9a",
                    400: "#f86486",
                    500: "#f63d68",
                    600: "#e0385f",
                    700: "#af2b4a",
                    800: "#872239",
                    900: "#671a2c",
                },
                c_orange: {
                    50: "#FFF0E8",
                    100: "#fecfb6",
                    200: "#fdb893",
                    300: "#fc9862",
                    400: "#FC8443",
                    500: "#fb6514",
                    600: "#e45c12",
                    700: "#b2480e",
                    800: "#8a380b",
                    900: "#692a08",
                },
                ...colors,
            },
            dark: darkColors,
        }),
        require("@tailwindcss/forms"),
        plugin(function ({ addBase }) {
            addBase({
                ":root": {
                    "--color-light-primary-50": "#EBFAF3",
                },
            });
        }),
    ],
});
