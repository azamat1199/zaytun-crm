import React from "react";
import { Line } from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import useColors from "@/hooks/useColors";

function LineChart({ x = false, y = false }) {
    const { colors } = useColors();
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: {
            x: {
                display: x,
                ticks: {
                    autoSkip: false,
                    maxRotation: 45, // Rotate labels by 45 degrees
                },
                grid: {
                    display: false, // Remove x-axis gridlines
                },
            },
            y: {
                display: y,
            },
        },
        elements: {
            point: {},
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
    );
    const labels = [
        "Test",
        "Test",
        "Test",
        "Test",
        "Test",
        "Test",
        "Test",
        "Test",
        "Test",
        "Test",
    ];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Diyor",
                data: [12, 40, 15, 45, 50, 80, 50, 70, 70, 40, 90],
                borderColor: colors.primary,
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: colors.primary,
            },
        ],
    };

    return <Line data={data} options={options} />;
}

export default LineChart;
