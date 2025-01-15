"use client";
import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";
import useColors from "@/hooks/useColors";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export function MultipleBarChart({ height = 255 }) {
    const { colors } = useColors();

    const tooltipCallback = (tooltipItems) => {
        return tooltipItems[0].dataset.label;
    };
    const labelCallback = (tooltipItems) => {
        return tooltipItems.formattedValue;
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltip: {
            callbacks: {
                title: null,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90, // Rotate labels by 45 degrees
                },
                grid: {
                    display: false, // Remove x-axis gridlines
                },
            },
            y: {
                ticks: {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    callback(_value, index, _ticks) {
                        return ["0", "1", "10", "100", "500", " 1 B"][index];
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: colors.primary,
                fontColor: "white",
                fontSize: 16,
                borderWidth: 0,
                displayColors: false,
                callbacks: {
                    title: tooltipCallback,
                    label: labelCallback,
                },
            },
        },
    };

    const labels = ["Касса", "АТМ", "Мобилка"];

    const data = {
        labels,
        datasets: [
            {
                label: "USD",
                data: labels.map(
                    (item) =>
                        item &&
                        faker.datatype.number({ min: 0, max: 1000000000 }),
                ),
                backgroundColor: "#293056",
                borderRadius: 4,
                barThickness: 100,
                fill: true,
                stack: "Stack 0",
            },
            {
                label: "EURO",
                data: labels.map(
                    (item) =>
                        item &&
                        faker.datatype.number({ min: 0, max: 1000000000 }),
                ),
                backgroundColor: "#717BBC",
                borderRadius: 4,
                barThickness: 100,
                fill: true,
                stack: "Stack 0",
            },
            {
                label: "RUB",
                data: labels.map(
                    (item) =>
                        item &&
                        faker.datatype.number({ min: 0, max: 1000000000 }),
                ),
                backgroundColor: "#F97066",
                borderRadius: 4,
                barThickness: 100,
                fill: true,
                stack: "Stack 0",
            },
        ],
    };

    return (
        <div className="w-full h-full">
            <Bar
                height={height}
                style={{ height: "100%" }}
                options={options}
                data={data}
                className="!h-full"
            />
        </div>
    );
}
