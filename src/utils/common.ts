import {
    ModuleType,
    SubModuleType,
    TabType,
} from "@/providers/redux/slices/userSlice";
import { AxiosError, AxiosResponse } from "axios";
import get from "lodash.get";

export const generatePathname = (slugs: string[]) =>
    slugs
        .map((slug) => `${slug}/`)
        .join("")
        .slice(0, -1);

export const removeFirstChar = (input: string) => {
    if (!input) {
        return "";
    }

    return input.substring(1);
};

const EXCEPTION_ROUTES: Record<string, string> = {
    "/crm/clients/legal_entity": "/crm/clients",
    "/crm/clients/physical_entity": "/crm/clients",
};

const swapRoutes = (url: string) => {
    if (url in EXCEPTION_ROUTES) {
        return EXCEPTION_ROUTES[url];
    }

    return url;
};

const formatPagePathname = (pagePathname: string) =>
    swapRoutes(pagePathname.toLowerCase().replaceAll("_", "-"));

export const formatPageCode = (code: string) =>
    typeof code === "string" ? code.toLowerCase().replaceAll("_", "-") : code;

export const formatUserData = (modules: any) => {
    const output = [];

    const list = modules;

    for (let i = 0; i < list.length; i++) {
        const appModule = list[i];
        const formattedModule: ModuleType = {
            code: appModule.code,
            subModules: [],
            initialPage: "",
        };

        for (let j = 0; j < appModule.subModules.length; j++) {
            const subModule = appModule.subModules[j];
            const formattedSubmodule: SubModuleType = {
                code: subModule.code,
                pages: [],
                initialPage: "",
            };

            for (let z = 0; z < subModule.pages.length; z++) {
                const page = subModule.pages[z];

                const pageUrl = formatPagePathname(
                    `/${appModule.code}/${subModule.code}/${page.code}`,
                );

                formattedSubmodule.pages.push({
                    code: page.code,
                    pageUrl,
                    tabs: page.tabs.map((tab: TabType) => ({
                        ...tab,
                        code: formatPageCode(tab.code),
                    })),
                });
            }

            formattedSubmodule.initialPage =
                formatPagePathname(formattedSubmodule.pages?.[0]?.pageUrl) ||
                "";

            formattedModule.subModules.push(formattedSubmodule);
        }

        formattedModule.initialPage =
            formattedModule.subModules?.[0]?.initialPage || "";

        output.push(formattedModule);
    }

    return output;
};

/**
 * Checks if a given value is a plain object.
 * @param {*} val - The value to check.
 * @returns {boolean} True if the value is a plain object, false otherwise.
 */
export const isPlainObject = (val: any) =>
    !!val && typeof val === "object" && val.constructor === Object;

export const selectDataWithoutPagination = <T>(res: AxiosResponse) =>
    (res.data?.result?.data?.content || []) as T[];

export const selectDataWithPagination = <T>(
    res: AxiosResponse,
): { list: T[]; totalElements: number; totalPages: number; size: number } => ({
    list: res.data?.result?.data?.content || [],
    totalElements: res.data?.result?.data?.totalElements || 0,
    totalPages: res.data?.result?.data?.totalPages || 0,
    size: res.data?.result?.data?.size || 0,
});

/**
 * Checks if a given string is a valid UUID (Universally Unique Identifier).
 *
 * @param {string} str - The string to be checked for UUID validity.
 * @returns {boolean} Returns true if the input string is a valid UUID, otherwise returns false.
 *
 * @example
 * const isValidUUID = checkIfValidUUID('550e8400-e29b-41d4-a716-446655440000');
 */
export const checkIfValidUUID = (str: string): boolean => {
    const regexExp =
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    return regexExp.test(str);
};

export const getSuccessMessage = (response: AxiosResponse) =>
    get(response, "data.result.message");

export const getErrorMessages = <T = Array<{ code: number; message: string }>>(
    error: AxiosError,
    asArray = true,
) => {
    const errors = get(error, "response.data.result.errors", []).map(
        (error: { errorCode: string; errorMsg: string }) => ({
            code: error.errorCode,
            message: error.errorMsg,
        }),
    );

    if (asArray) {
        return errors as T;
    }

    return errors.map((error) => error.message).join(" ") as T;
};

export const joinArray = (array: Array<string | number>, separator = " ") => {
    if (!Array.isArray(array)) {
        return;
    }

    return array.join(separator);
};

export const generateYears = (start: number = 1960, end: number = 2024) =>
    new Array(end - start + 1)
        .fill("")
        .map((_, i) => ({ label: `${start + i}`, value: start + i }))
        .reverse();

export const month = [
    {
        label: "январь",
        value: "1",
    },
    {
        label: "февраль",
        value: "2",
    },
    {
        label: "март",
        value: "3",
    },
    {
        label: "апрель",
        value: "4",
    },
    {
        label: "май",
        value: "5",
    },
    {
        label: "июнь",
        value: "6",
    },
    {
        label: "июль",
        value: "7",
    },
    {
        label: "август",
        value: "8",
    },
    {
        label: "сентябрь",
        value: "9",
    },
    {
        label: "окрябрь",
        value: "10",
    },
    {
        label: "ноябр",
        value: "11",
    },
    {
        label: "декабр",
        value: "12",
    },
];

export const getFileExtension = (filename: string) => {
    if (typeof filename !== "string") {
        return "";
    }
    // get file extension
    const extension = filename.split(".").pop();
    return extension;
};

/**
 * Formats a file size in bytes to a human-readable string.
 *
 * @param {number} bytes - The file size in bytes.
 * @returns {string} A human-readable representation of the file size.
 */
export function formatFileSize(bytes: number = 0) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function formatTime(timestamp: string) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

export function formatDate(timestamp: string) {
    const days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    const months = [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ];
    const date = new Date(timestamp);
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${dayOfWeek}, ${day} ${month} ${year}`;
}

/**
 * Extracts the pathname from a given URL.
 * @param url - The URL from which to extract the pathname.
 * @returns The extracted pathname.
 */
export const extractPathname = (url: string): string => {
    // Create a new URL object with the given URL
    const urlObject = new URL(url);

    // Extract the pathname from the URL object
    const pathname = urlObject.pathname;

    // Return the extracted pathname
    return pathname;
};

/**
 * Formats the name with middle initial.
 * @param {Object} nameObj - An object containing firstName, lastName, and middleName.
 * @param {string} nameObj.firstName - The first name.
 * @param {string} nameObj.lastName - The last name.
 * @param {string} nameObj.middleName - The middle name.
 * @returns {string} The formatted name.
 */
export const formatName = ({
    firstName,
    lastName,
    middleName,
}: {
    firstName: string;
    lastName: string;
    middleName: string;
}): string => {
    // Check if any of the inputs are null, undefined, or empty string and replace them
    firstName = firstName || "";
    lastName = lastName || "";
    middleName = middleName || "";

    // Extract the first letter of the middleName
    const middleInitial: string =
        middleName.length > 0 ? middleName.charAt(0).toUpperCase() + "." : "";

    // Return the formatted name
    return `${lastName} ${middleInitial} ${firstName.charAt(0)}`.trim();
};

/**
 * Delays execution asynchronously by a specified duration.
 * @param {number} delay - The time to delay execution in milliseconds.
 * @returns {Promise<void>} - A promise that resolves after the specified delay.
 */
export const sleep = (delay = 3000) =>
    new Promise((resolve) => setTimeout(resolve, delay));

/**
 * Creates an array filled with the specified value and size.
 * @param {*} [itemValue={}] - The value to fill the array with. Defaults to an empty object if not provided.
 * @param {number} [size=5] - The size of the array to create. Defaults to 5 if not provided.
 * @returns {Array} - An array filled with the specified value and size.
 */
export const createMockArray = (itemValue = {}, size = 5) =>
    new Array(size).fill(itemValue);

/**
 * Checks if the given file name corresponds to an image file.
 * @param {string} fileName - The name of the file to check.
 * @returns {boolean} - True if the file is an image, false otherwise.
 */
export const isImage = (fileName: string): boolean => {
    // Extracting the file extension
    const extension: string = fileName.split(".").pop()?.toLowerCase() || "";

    // Array of valid image file extensions
    const imageExtensions: string[] = ["jpg", "jpeg", "png", "gif", "bmp"];

    // Check if the extension is in the array of image extensions
    return imageExtensions.includes(extension);
};

export const getFilePath = (filePath?: string) => {
    if (!filePath) {
        return "";
    }

    switch (process.env.NEXT_PUBLIC_ENV) {
        case "LOCAL":
            return `${process.env.NEXT_PUBLIC_FILE_VIEW}${extractPathname(filePath)}`;
        case "TEST":
            return filePath;
        default:
            return "";
    }
};

export function convertSeconds(seconds: number) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * (24 * 60 * 60);

    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * (60 * 60);

    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    const result = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
    };

    return result;
}

/**
 * Converts days, hours, minutes, and seconds into total seconds.
 * @param {number} days - The number of days.
 * @param {number} hours - The number of hours.
 * @param {number} minutes - The number of minutes.
 * @param {number} seconds - The number of seconds.
 * @returns {number} The total number of seconds.
 */
export const timeToSeconds = ({
    days,
    hours,
    minutes,
    seconds,
}: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}): number => {
    return days * 86400 + hours * 3600 + minutes * 60 + seconds;
};

export const revertPageCode = (code: string) =>
    typeof code === "string" ? code.toUpperCase().replaceAll("-", "_") : "";

export const isTestEnv = process.env.NEXT_PUBLIC_ENV === "TEST";

export const downloadFile = async (url: string, name: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = name; // Set the desired file name with .xls extension
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
};
