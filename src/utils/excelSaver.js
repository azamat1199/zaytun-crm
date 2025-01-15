import { utils, writeFile } from "xlsx";

export function convertArrayToExcelWorksheet(list) {
    const ws = utils.book_new();
    const headerRow = Object.keys(list[0]);
    utils.sheet_add_aoa(ws, [headerRow], { origin: "A1" });

    list.forEach((object, index) => {
        const dataRow = Object.values(object);
        utils.sheet_add_aoa(ws, [dataRow], { origin: `A${index + 2}` });
    });

    ws["!cols"] = [{ wch: 22 }];

    return ws;
}

export function exportExcelWorksheetToFile(ws, fileName) {
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, fileName);
    writeFile(wb, fileName);
}
