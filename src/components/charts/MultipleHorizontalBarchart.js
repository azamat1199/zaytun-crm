"use client";
import React, { useEffect, useState } from "react";

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
import useColors from "@/hooks/useColors";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
);

export function MultipleHorizontalBarChart({ data }) {
    const [showbar, setShowbar] = useState(false);
    const { colors } = useColors();

    useEffect(() => {
        setTimeout(() => setShowbar(true), 1000);
    }, []);

    const tooltipCallback = (tooltipItems) => {
        return tooltipItems[0].dataset.label;
    };
    const labelCallback = (tooltipItems) => {
        return tooltipItems.formattedValue;
    };

    const options = {
        responsive: true,
        categoryPercentage: 0.95,
        maintainAspectRatio: false,
        tooltip: {
            callbacks: {
                title: null,
            },
        },
        scales: {
            x: {
                barThickness: 300,
                categoryPercentage: 1,
                type: "category",
                min: 0,
                max: 2,
                grid: {
                    display: false,
                },
            },
            y: {
                categoryPercentage: 300,
            },
        },
        plugins: {
            legend: {
                fullSize: true,
                align: "end",
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    boxWidth: 100,
                    boxHeight: 100,
                },
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

    return (
        <div className="h-full">
            {showbar && (
                <Bar options={options} data={data} className="h-full" />
            )}
        </div>
    );
}
