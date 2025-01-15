import React from "react";
import { Spinner } from "@material-tailwind/react";

interface LoaderProps {
    size?: number;
    color?: any;
    className?: string;
}
const Loader = (props: LoaderProps) => {
    const { size, color } = props;
    return (
        <div className="flex items-end gap-8">
            <Spinner
                className={`h-${size} w-${size}`}
                color={color}
                {...props}
            />
        </div>
    );
};

export default Loader;
