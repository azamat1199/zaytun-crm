import moment from "moment-timezone";

export const convertDateFormat = (dateString) => {
    moment.locale("en-gb");
    // Parse the date string using Moment.js and specify the input format
    const parsedDate = moment(dateString, "DD.MM.YYYY HH:mm:ss");

    // Format the parsed date to ISO format
    const isoFormattedDate = parsedDate.toISOString(true);

    return isoFormattedDate;
};

export const formatDate = (isoDate, format) => {
    moment.locale("en-gb");

    const date = moment(isoDate).valueOf();
    const utcMoment = moment(date);

    // Add the desired timezone offset (+5 hours)
    const localMoment = utcMoment.add(5, "hours");
    // const localMoment = utcMoment.zone('+05:00');
    // Format the local time as a string

    const res = localMoment.format(format || "DD.MM.YYYY HH:mm").split(" ");
    const second = localMoment.format(format || "HH:mm:ss");
    return {
        date: res ? res[0] : "--/--/----",
        time: res ? res[1] : "--:--",
        second: second ? second : "--:--:--",
        fullTime: res ? res.join(" | ") : "--/--/---- | --:--",
    };
};
export const separateDateTime = (date) => {
    const d = formatDate(convertDateFormat(date));

    return {
        date:
            !d.date.toLowerCase()?.includes("invalid") && d.date
                ? d.date
                : "--/--/----",
        time:
            !d.date.toLowerCase()?.includes("invalid") && d.time
                ? d.time
                : "--:--",
        second:
            !d.second.toLowerCase()?.includes("invalid") && d.second
                ? d.second
                : "--:--:--",
        fullTime:
            !d.date.toLowerCase()?.includes("invalid") && d.fullTime
                ? d.fullTime
                : "--/--/---- | --:--",
    };
};
