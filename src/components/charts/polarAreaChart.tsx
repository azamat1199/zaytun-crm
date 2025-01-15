import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { motion } from "framer-motion";
import { numberFormat } from "../../utils/numberUtils";

const drawChart = (
    element: any,
    data: any,
    colors: any,
    simpleArea: boolean,
) => {
    const boxSize = 500;
    d3.select(element).select("svg").remove(); // Remove the old svg
    // Create new svg
    const svg = d3
        .select(element)
        .append("svg")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
        .append("g")
        .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

    const arcGenerator: any = d3
        .arc()
        .cornerRadius(8)
        .innerRadius(140)
        .outerRadius((d: any) => {
            if (simpleArea) {
                return 250;
            } else {
                const temp = 250 - d.index * 20;
                return temp >= 150 ? temp : 150;
            }
        });

    const pieGenerator = d3
        .pie()
        .startAngle(-0.75 * Math.PI)
        .value((d: any) => d?.value);

    const arcs = svg.selectAll().data(pieGenerator(data)).enter();
    arcs.append("path")
        .attr("d", arcGenerator)
        .style("fill", (d, i) => colors[i % data.length])
        .transition()
        .duration(700)
        .attrTween("d", function (d) {
            const i = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arcGenerator(d);
            };
        });
};

interface PolarAreaProps {
    readonly list?: Array<{
        value: number;
        color: string;
        label: string;
    }>;
    readonly sumTitle?: string;
    readonly simpleArea: boolean;
    // readonly areaSize: number;
}

export const PolarAreaChart = (props: PolarAreaProps) => {
    const { list, sumTitle, simpleArea } = props;
    const ref = useRef(null);
    const data = list
        ?.sort((a: any, b: any) => a.value - b.value)
        ?.map((item) => {
            return { value: item.value };
        });
    const colors = list
        ?.sort((a: any, b: any) => a.value - b.value)
        ?.map((item) => {
            return item.color;
        });

    useEffect(() => {
        if (ref.current) {
            drawChart(ref.current, data, colors, simpleArea);
        }
    }, [ref]);

    const sum = numberFormat(
        list?.reduce((sum: number, item: any) => (sum += item.value), 0) || 0,
    );
    const sLength = sum.toString().length;
    const textSize =
        sLength <= 2 ? 58 : sLength <= 6 ? 38 : sLength <= 7 ? 30 : 18;
    console.log("textSize---------", textSize);
    return (
        <div
            className={`flex ${
                simpleArea ? "flex-col" : "flex-row"
            } items-center gap-8 justify-center`}
        >
            <div className="flex-1 w-full h-full bg-block max-h-[270px] max-w-[270px] overflow-x-auto min-h-[270px] relative">
                <div className="bg-white  flex justify-around">
                    <div className="graph w-full " ref={ref} />
                </div>
                {simpleArea ? (
                    <motion.div
                        initial={{
                            scale: 0,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            scale: 1,
                            translateX: "-50%",
                            translateY: "-50%",
                            transition: { duration: 0.5 },
                        }}
                        className="overflow-hidden absolute w-[140px] h-[140px]  flex justify-center items-center top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] rounded-[50%]"
                    >
                        <div
                            style={{
                                boxShadow:
                                    "#fff 5px -25px 16px 1px inset, #fff -5px 32px 16px 1px inset",
                            }}
                            className="absolute w-full h-full flex flex-col justify-center items-center top-0 left-0  rounded-[50%]"
                        >
                            <p
                                style={{ fontSize: textSize }}
                                className={`font-semibold text-[#333] text-center`}
                            >
                                {sum}
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{
                            scale: 0,
                            translateX: "-50%",
                            translateY: "-50%",
                        }}
                        animate={{
                            scale: 1,
                            translateX: "-50%",
                            translateY: "-50%",
                            transition: { duration: 0.5 },
                        }}
                        style={{
                            boxShadow:
                                "rgba(14, 30, 37, 0.12) 0px -9px 21px 0px, rgba(14, 30, 37, 0.32) 0px 9px 16px 0px",
                        }}
                        className="overflow-hidden absolute w-[150px] h-[150px]  flex justify-center items-center top-[50%] left-[50%] bg-white translate-x-[-50%] translate-y-[-50%] rounded-[50%]"
                    >
                        <div className="border-[6px] border-[#eae6fe] rounded-[50%] w-[135px] h-[135px]"></div>
                        <div
                            style={{
                                boxShadow:
                                    "#fff 5px -25px 16px 1px inset, #fff -5px 32px 16px 1px inset",
                            }}
                            className="absolute w-full h-full flex flex-col justify-center items-center top-0 left-0  rounded-[50%]"
                        >
                            <p className="font-semibold text-[#333]">{sum}</p>
                            <p className="text-[#848484] text-[13px] font-light">
                                {sumTitle}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
            <div
                className={`flex flex-wrap justify-between gap-[35px]`}
                style={{ width: simpleArea ? "auto" : 360 }}
            >
                {list
                    ?.sort((a: any, b: any) => b.value - a.value)
                    ?.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-4 items-start"
                            style={{ width: 150 }}
                        >
                            <span
                                style={{ background: item.color }}
                                className={`w-[15px] h-[15px] rounded-[50%] mt-1`}
                            />
                            <div>
                                <p className="text-[14px] text-[#4B5563]">
                                    {item.label}
                                </p>
                                <p className="text-[16px] text-[#333333] font-[600]">
                                    {numberFormat(item.value)}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
