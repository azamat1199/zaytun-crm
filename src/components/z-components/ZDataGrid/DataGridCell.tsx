import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { DataGridColumnType } from "./DataGridCell.types";
import { motion } from "framer-motion";

interface DataGridCellProps extends Partial<DataGridColumnType> {
    children: ReactNode;
    scrollable?:boolean;
}

/**
 * `DataGridCell` is a component designed for rendering individual cells within a data grid. It supports custom text alignment and additional styling. This component is part of a larger data grid system and can inherit properties defined in `DataGridColumnType` for consistent styling and behavior across the grid.
 *
 * @component
 * @param {DataGridCellProps} props - The properties of the data grid cell component.
 * @param {ReactNode} props.children - The content to be displayed inside the cell.
 * @param {string | string[]} [props.className] - Additional custom CSS classes for styling the cell.
 * @param {'left' | 'right' | 'center'} [props.align='left'] - Text alignment within the cell. Defaults to 'left' if not specified.
 * @returns {React.ReactElement} - The rendered data grid cell with content and specified alignment.
 */
const DataGridCell: FC<DataGridCellProps> = ({
    className,
    children,
    align,
    scrollable
}) => {
    return (
        <motion.div
            className={twMerge([
                "px-6 py-4 text-b-2-r text-c_neutral-500 break-words flex-shrink-0",
                align === "right" && "text-right",
                align === "center" && "text-center",
                className,
                scrollable && 'flex-shrink-0'
            ])}
        >
            {children}
        </motion.div>
    );
};

export default DataGridCell;
