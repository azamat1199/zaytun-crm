export const numberFormat = (number: number) => {
    return number
        .toString()
        .replace(/(?<=[0-9])(?=(?:[0-9]{3})+(?![0-9]))/g, " ");
};
