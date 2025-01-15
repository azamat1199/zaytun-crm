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
    Filler,
    Tooltip,
} from "chart.js";
import useColors from "@/hooks/useColors";

function MultiLineChart({ x = false }) {
    const { colors } = useColors();

    const tooltipCallback = () => {
        return null;
    };
    const labelCallback = (tooltipItems) => {
        return tooltipItems.dataset.label + " " + tooltipItems.formattedValue;
    };
    const gradient = (context) => {
        const bgColor = [
            "rgba(18, 183, 106, 0.1)",
            "rgba(18, 183, 106, 0.050)",
            "rgba(255, 255, 255, 0.2)",
            "rgba(255, 255, 255, 0.2)",
        ];
        if (!context.chart.chartArea) {
            return;
        }
        const {
            ctx,
            chartArea: { top, bottom },
        } = context.chart;
        const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
        gradientBg.addColorStop(0, bgColor[0]);
        gradientBg.addColorStop(0.5, bgColor[1]);
        gradientBg.addColorStop(1, bgColor[2]);
        return gradientBg;
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        stacked: false,
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
                type: "linear",
                display: true,
                position: "left",
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
    ChartJS.register(
        CategoryScale,
        LinearScale,
        Filler,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
    );
    const labels = Array.from({ length: 11 }, () => "test");
    const data = {
        labels: labels,
        datasets: [
            {
                label: "АТМ",
                data: Array.from(
                    { length: 150 },
                    () => Math.floor(Math.random() * (80 - 70 + 1)) + 70,
                ),
                borderColor: "#F04438",
                fill: true,
                backgroundColor: gradient,
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#F04438",
                tension: 0.2,
            },
            {
                label: "Касса",
                data: Array.from(
                    { length: 150 },
                    () => Math.floor(Math.random() * (40 - 30 + 1)) + 30,
                ),
                borderColor: "#12B76A",
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#12B76A",
                tension: 0.2,
            },
            {
                label: "Мобилка",
                data: Array.from(
                    { length: 150 },
                    () => Math.floor(Math.random() * (60 - 50 + 1)) + 50,
                ),
                borderColor: "#FEC84B",
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#FEC84B",
                tension: 0.2,
            },
            {
                label: "Курс ЦБ",
                data: Array.from(
                    { length: 150 },
                    () => Math.floor(Math.random() * (20 - 10 + 1)) + 10,
                ),
                fill: true,
                backgroundColor: gradient,
                borderColor: "#667085",
                pointBorderColor: "transparent",
                pointBackgroundColor: "transparent",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "#667085",
                tension: 0.2,
            },
        ],
    };

    return <Line data={data} options={options} />;
}

export default MultiLineChart;
