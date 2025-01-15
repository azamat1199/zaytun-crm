import React from "react";
import Image from "next/image";
import { Select } from "@/components/select/Select";
import "./table.css";

function TableValue(props) {
    const {
        columnCash = [],
        columnMobile = [],
        tableTopContent = [],
        columnCurrency = [],
        dataATM = [],
        dataCash = [],
        dataCurrency = [],
        dataSelect = [],
        columnTableTop = [],
    } = props;

    return (
        <div className={"dark:bg-black-700 bg-white rounded-lg p-4"}>
            {tableTopContent && (
                <div
                    className={"mb-5 w-[52%] flex justify-between items-center"}
                >
                    <p className={"text-[18px] font-medium text-gray-700"}>
                        Валютная статистика
                    </p>
                    <Select data={dataSelect} label={"Фильтр"} />
                    <Select data={dataSelect} label={"Валюта"} />
                    <Select data={dataSelect} label={"Источник"} />
                </div>
            )}
            <div className={"w-full"}>
                <tr className={"table-val-header-row"}>
                    <th className={"table-top-content col-span-1"}>
                        {columnTableTop[0]}
                    </th>
                    <th className={"table-top-content col-span-3"}>
                        {columnTableTop[1]}
                    </th>
                    <th className={"table-top-content col-span-2"}>
                        {columnTableTop[2]}
                    </th>
                    <th className={"border-r-0 table-top-content col-span-2"}>
                        {columnTableTop[3]}
                    </th>
                </tr>
            </div>
            <div>
                <table className={"w-full "}>
                    <tbody className="table-val-body">
                        <td
                            className={
                                "border-0 border-r border-gray-200 col-start-1 col-span-1"
                            }
                        >
                            <tr className={"grid grid-cols-3 w-full py-3 "}>
                                {columnCurrency &&
                                    columnCurrency.map((item, index) => (
                                        <th
                                            key={index}
                                            className={"w-40 table-header"}
                                        >
                                            {item}
                                        </th>
                                    ))}
                            </tr>
                            {dataCurrency &&
                                dataCurrency.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={"table-currency-data"}
                                    >
                                        <td
                                            className={
                                                "flex items-center w-40 pl-8 table-header"
                                            }
                                        >
                                            <Image
                                                src={item.src}
                                                alt={"country currency"}
                                                className={"mr-2"}
                                                width={35}
                                                height={35}
                                            />
                                            <p>{item.value}</p>
                                        </td>
                                    </tr>
                                ))}
                        </td>
                        <td
                            className={
                                "border-r border-gray-200 col-start-2 col-span-3"
                            }
                        >
                            <tr className={"grid grid-cols-3 py-3"}>
                                {columnCash &&
                                    columnCash.map((item, index) => (
                                        <th
                                            key={index}
                                            className={"w-40 table-header"}
                                        >
                                            {item}
                                        </th>
                                    ))}
                            </tr>
                            {dataCash &&
                                dataCash.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            "grid grid-cols-3 py-4 border-t border-gray-200 leading-5"
                                        }
                                    >
                                        <td
                                            className={
                                                "text-center w-40  text-secondary text-[12px]"
                                            }
                                        >
                                            {item.purchased}
                                        </td>
                                        <td
                                            className={
                                                "text-center w-40  text-secondary text-[12px]"
                                            }
                                        >
                                            {item.sale}
                                        </td>
                                        <td
                                            className={
                                                "text-center w-40  text-secondary text-[12px]"
                                            }
                                        >
                                            {item.balance}
                                        </td>
                                    </tr>
                                ))}
                        </td>
                        <td
                            className={
                                "border-r border-gray-200 col-start-5 col-span-2"
                            }
                        >
                            <tr className={"grid grid-cols-3 py-3"}>
                                {columnMobile &&
                                    columnMobile.map((item, index) => (
                                        <th
                                            key={index}
                                            className={"table-header w-64"}
                                        >
                                            {item}
                                        </th>
                                    ))}
                            </tr>
                            {dataATM &&
                                dataATM.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            "grid grid-cols-3 py-4 border-t border-gray-200 leading-5"
                                        }
                                    >
                                        <td
                                            className={
                                                "text-center w-64  text-secondary text-[12px]"
                                            }
                                        >
                                            {item.purchase}
                                        </td>
                                        <td
                                            className={
                                                "text-center w-64  text-secondary text-[12px]"
                                            }
                                        >
                                            {item.sales}
                                        </td>
                                    </tr>
                                ))}
                        </td>
                        <td
                            className={
                                "border-r-0 border-gray-200  col-start-7 col-span-2"
                            }
                        >
                            <tr className={"grid grid-cols-3 py-3"}>
                                {columnMobile &&
                                    columnMobile.map((item, index) => (
                                        <th
                                            key={index}
                                            className={"table-header w-64"}
                                        >
                                            {item}
                                        </th>
                                    ))}
                            </tr>
                            {dataATM &&
                                dataATM.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            "grid grid-cols-3 py-4 border-t border-gray-200 leading-5"
                                        }
                                    >
                                        <td
                                            className={
                                                "text-center w-64  text-secondary text-[12px]"
                                            }
                                        >
                                            {item.purchase}
                                        </td>
                                        <td
                                            className={
                                                "text-center w-64  text-secondary text-[12px]"
                                            }
                                        >
                                            {item.sales}
                                        </td>
                                    </tr>
                                ))}
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableValue;
