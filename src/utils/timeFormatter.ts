import moment from "moment";

export function formatCreatedAtTime(createdAt: string): string {
    return createdAt ? moment(createdAt).format("HH:mm") : "";
}

export function formatCreatedAtDate(createdAt: string): string {
    return createdAt ? moment(createdAt).format("DD.MM.YYYY") : "";
}
