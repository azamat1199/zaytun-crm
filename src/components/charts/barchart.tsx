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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

interface BarChartProps {
    readonly list?: [
        {
            label: string;
            value: number;
            color: string;
        },
    ];
    readonly groupList?: [
        {
            label: string;
            color: string;
            child: [{ value: number; label: string }];
        },
    ];
    readonly className?: string;
    readonly tooltipTitle?: string;
    readonly barWidth?: number;
    readonly barRounded?: number;
    readonly groupOfCharts?: boolean;
}

export function BarChart(props: BarChartProps) {
    const {
        // className,
        list = [],
        tooltipTitle = "title",
        barWidth = 25,
        barRounded = 30,
        groupOfCharts = false,
        groupList = [],
    } = props;

    const data: any = {
        labels: list.map((item) => {
            return item.label;
        }),
        datasets: [
            {
                label: tooltipTitle,
                data: list.map((item) => {
                    return item.value;
                }),
                backgroundColor: list.map((item) => {
                    return item.color;
                }),
                borderRadius: barRounded,
                barThickness: barWidth,
                fill: true,
            },
        ],
    };

    const datasets: any = groupList.map((item: any) => {
        const temp: any = {
            label: item.label.toUpperCase(),
            data: item.child.map((elem: any) => {
                return elem.value;
            }),
            backgroundColor: item.color,
            borderRadius: 4,
            fill: true,
            pointStyle: "circle",
            barPercentage: 0.9,
            categoryPercentage: 0.7,
        };
        return temp;
    });
    const groupData = {
        labels: groupList[0]
            ? groupList[0].child.map((item) => {
                  return item.label;
              })
            : [],
        datasets: datasets,
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                barThickness: 20,
                ticks: {
                    autoSkip: true,
                    maxRotation: 45, // Rotate labels by 45 degrees
                },
                grid: {
                    display: false, // Remove x-axis gridlines
                },
            },
            y: {
                grid: {
                    // display: false
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
        },
    };

    const groupOptions: any = {
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
                backgroundColor: "#039855",
                fontColor: "white",
                fontSize: 16,
                borderWidth: 0,
                displayColors: false,
            },
        },
    };

    return (
        <Bar
            options={groupOfCharts ? groupOptions : options}
            data={groupOfCharts ? groupData : data}
            className="h-full"
        />
    );
}
