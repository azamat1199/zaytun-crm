/* eslint-disable @typescript-eslint/no-var-requires */
import dayjs from "dayjs";
import "dayjs/plugin/utc";
import "dayjs/plugin/duration";

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/duration"));

/**
 * Checks if the provided date-time string is valid.
 * @param {string} dateTime - The date and time string to check.
 * @returns {boolean} - True if the date-time is valid, false otherwise.
 */
export const isValidDateTime = (dateTime: string): boolean => {
    return dayjs(dateTime).isValid();
};

/**
 * Formats a given date string using the specified format.
 * @param {string} date - The date string to format.
 * @param {string} [format='DD.MM.YYYY'] - The format to use, defaults to 'DD.MM.YYYY'.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: string, format = "DD.MM.YYYY") => {
    if (!isValidDateTime(date) || !date) {
        return "-";
    }

    return dayjs(date).format(format);
};

/**
 * Formats a given date and time string into separate date and time parts.
 * @param {string} dateTime - The date and time string to format.
 * @returns {{ date: string, time: string }} - An object containing the formatted date and time strings.
 */

export const formatDateTime = (
    dateTime: string,
): { date: string; time: string } => {
    // Parse the given dateTime string using Day.js
    const parsedDateTime = dayjs(dateTime);

    // Format date part in the format 'DD.MM.YYYY'
    const formattedDate = parsedDateTime.format("DD.MM.YYYY");

    // Format time part in the format 'HH:mm:ss'
    const formattedTime = parsedDateTime.format("HH:mm:ss");

    return { date: formattedDate, time: formattedTime };
};

/**
 * Calculates the time difference between the provided date-time and the current time.
 * @param {string} dateTime - The date and time string to compare against.
 * @returns {Object} - A human-readable representation of the time difference.
 */
export const calculateTimeDifference = (dateTime: string) => {
    if (!isValidDateTime(dateTime)) {
        return {
            weeks: null,
            days: null,
            hours: null,
            minutes: null,
            renderValue: "",
        };
    }

    // Parse the provided dateTime using Day.js
    const targetDateTime = dayjs(dateTime);

    // Calculate the difference between the target date-time and the current time
    const duration = dayjs.duration(targetDateTime.diff(dayjs()));

    // Extract components of the duration
    const weeks = Math.floor(duration.asWeeks());
    const days = Math.floor(duration.asDays()) % 7;
    const hours = Math.floor(duration.asHours()) % 24;
    const minutes = Math.floor(duration.asMinutes()) % 60;

    let renderValue = "";

    // Choose the smallest dimension (minutes, hours, days, or weeks)
    //   if (weeks > 0) {
    //     renderValue = `${weeks} week${weeks !== 1 ? 's' : ''} ${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
    //   } else if (days > 0) {
    //     renderValue = `${days} day${days !== 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    //   } else if (hours > 0) {
    //     renderValue = `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    //   } else {
    //     renderValue = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    //   }
    if (weeks > 0) {
        renderValue = `${weeks} w ${days} d`;
    } else if (days > 0) {
        renderValue = `${days} d ${hours} h`;
    } else if (hours > 0) {
        renderValue = `${hours} h ${minutes} m`;
    } else {
        renderValue = `${minutes} m`;
    }

    return {
        weeks: Number.isNaN(weeks) ? null : weeks,
        days: Number.isNaN(days) ? null : days,
        hours: Number.isNaN(hours) ? null : hours,
        minutes: Number.isNaN(minutes) ? null : minutes,
        renderValue,
    };
};

export default dayjs;
