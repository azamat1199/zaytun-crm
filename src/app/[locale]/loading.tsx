"use client";
import React from "react";
import Loader from "@/components/spinner/Loader";

const Loading = () => {
    return (
        <div
            className="absolute w-full h-full
    bg-white flex justify-center items-center"
        >
            <Loader color="green" className="h-12 w-12" />
        </div>
    );
};

export default Loading;
