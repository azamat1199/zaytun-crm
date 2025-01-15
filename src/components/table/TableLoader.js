import React from "react";
import { MainLoader } from "../loader/MainLoader";

function TableLoader() {
    return (
        <div className="table-loader flex justify-center items-center w-full h-full absolute top-0 left-0">
            <MainLoader />
        </div>
    );
}

export default TableLoader;
