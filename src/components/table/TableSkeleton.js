import React from "react";
import "./table.css";
const TableSkeleton = ({ columns = [] }) => {
    const widths = columns.map(
        () => `${Math.floor(Math.random() * (100 - 50 + 1)) + 50}%`,
    );
    return (
        <table role="status" className="w-full animate-pulse ">
            <thead>
                <tr className="flex items-center justify-between">
                    {columns.map((item, i) => (
                        <th
                            key={i}
                            className="loading-header"
                            style={{
                                width: widths[i],
                            }}
                        />
                    ))}
                </tr>
            </thead>
            <tbody>
                {[1, 1, 1, 1, 1, 1, 1].map((_, index) => (
                    <tr
                        key={index}
                        className="flex items-center justify-between"
                    >
                        {columns.map((item, i) => (
                            <td
                                key={i}
                                className="loading-body"
                                style={{
                                    width: widths[i],
                                }}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableSkeleton;
