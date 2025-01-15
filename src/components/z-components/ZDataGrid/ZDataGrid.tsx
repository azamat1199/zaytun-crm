import { twMerge } from "tailwind-merge";
import DataGridCell from "./DataGridCell";
import useZDataGridContext from "./ZDataGridProvider/useZDataGridContext";
import { ZCheckbox, ZTextField } from "../FormElements";
import ZPagination from "../ZPagination";
import ZButtonGroups from "../ZButtonGroups";
import ExportButton from "./ExportButton";
import SettingsButton from "./SettingsButton";
import ZContextMenu from "../ZContextMenu";
import MoreVerticalIcon from "@/components/icons/MoreVerticalIcon";
import { IconButton } from "@material-tailwind/react";
import { ZContextMenuProps } from "../ZContextMenu/ZContextMenu";
import FilterButton from "./FilterButton";
import TableSearchIcon from "@/components/icons/TableSearchIcon";
import { DataGridColumnType } from "./DataGridCell.types";
import ZButton, { ZButtonProps } from "../ZButton/ZButton";
import useQueryString from "@/hooks/helpers/useQueryString";
import TablePlaceholder from "@/components/table/TablePlaceholder";
import TableLoader from "@/components/table/TableLoader";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { ComponentPropsWithoutRef, ComponentType } from "react";

export interface ZDataGridProps<TItem = any> {
    hasOrderColumn?: boolean;
    hasCheckbox?: boolean;
    hasCustomizeColumns?: boolean;
    hasExport?: boolean;
    hasSearch?: boolean;
    handleRowClick?: (row: TItem, i: number) => void;
    rowClassName?: string;
    contextMenu?: ZContextMenuProps["list"];
    hasActions?: boolean;
    hasFilter?: boolean;
    hasSettings?: boolean;
    columns: DataGridColumnType[];
    rows: any[];
    buttons?: Array<ZButtonProps & { value: any }>;
    buttonKey?: string;
    pagination?: {
        totalPages?: number;
        defaultPage?: number;
    };
    loading?: boolean;
    handleRowDoubleClick?: (id: string, i: number) => void;
    withPagination?: boolean;
    hasAddButton?: boolean;
    addButtonProps?: ZButtonProps;
    actionsType?: "context-menu" | "buttons";
    actionButtons?: Array<ComponentPropsWithoutRef<"div">>;
    rootClassName?: string;
    scrollable?: boolean;
    filter?: {
        FilterComponent: ComponentType;
    };
    hasOrder?: boolean;
}

/**
 * ZDataGrid component renders a data grid with optional features like ordering, checkboxes, column customization, export, and search.
 * It integrates with a table context provider for data and configuration.
 *
 * @param {DataGridProps} props - Configuration options for the grid.
 * @param {boolean} [props.hasOrderColumn=true] - Shows an order column.
 * @param {boolean} [props.hasCheckbox=true] - Includes row selection checkboxes.
 * @param {boolean} [props.hasCustomizeColumns=true] - Enables column customization.
 * @param {boolean} [props.hasExport=true] - Adds export functionality.
 * @param {boolean} [props.hasSearch=true] - Incorporates a search feature.
 * @param {function} [props.handleRowClick] - Callback function invoked when a row is clicked.
 * @param {string} [props.rowClassName] - External styles for data grid rows.
 * @param {ZContextMenuProps['list']} [props.contextMenu] - List of items for the context menu.
 * @param {boolean} [props.hasActions=true] - Indicates whether the grid has action buttons.
 * @param {boolean} [props.hasFilter=true] - Indicates whether the grid has a filter feature.
 * @param {boolean} [props.hasSettings=true] - Indicates whether the grid has settings.
 * @param {DataGridColumnType[]} props.columns - Array of column definitions.
 * @param {any[]} props.rows - Array of data items to be rendered in the grid.
 * @param {Array<ZButtonProps & { value: any }>} [props.buttons] - Array of button props along with their values.
 * @param {string} props.buttonKey - Key used for query string manipulation with buttons.
 * @param {{ totalPages?: number; defaultPage?: number; }} props.pagination - Pagination configuration object.
 * @param {boolean} [props.loading] - Indicates whether the grid is in a loading state.
 * @param {function} [props.handleRowDoubleClick] - handle row double click
 * @param {boolean} [props.withPagination] - Whether pagination is visible
 * @param {boolean} [props.hasAddButton] - Whether hasAddButton is visible
 * @param {object} [props.addButtonProps] - props for add button
 * @param {string} [props.rootClassName] - className for root element
 * @param {boolean} [props.scrollable=false] - whether horizontal scroll is enabled
 * @returns {React.ReactElement} The rendered data grid component.
 */

const ZDataGrid = ({
    hasCheckbox = false,
    hasActions = true,
    hasExport = true,
    hasSearch = true,
    hasFilter = true,
    contextMenu = [],
    rowClassName,
    hasSettings = true,
    hasOrder = false,
    columns,
    loading,
    buttons,
    pagination,
    buttonKey,
    rows,
    handleRowDoubleClick,
    handleRowClick,
    withPagination = true,
    hasAddButton = false,
    addButtonProps,
    actionButtons,
    actionsType = "context-menu",
    rootClassName,
    scrollable,
    filter,
}: ZDataGridProps) => {
    const { t } = useAppTranslations();
    const { keyExtractor, setNewValues, page, size } = useZDataGridContext();
    const { appendQueryString, searchParams } = useQueryString();
    const activeButton =
        searchParams.get(buttonKey || "") || buttons?.at(0)?.value;
    const headerCellGeneralStyle =
        "py-3 text-left text-c_neutral-500 flex items-center  flex-shrink-0";

    const handleBodyClick = () => {};

    const handleButtonsClick = (value: any) => {
        appendQueryString(buttonKey || "", value);
    };

    const hasButtons = Array.isArray(buttons) && buttons.length > 0;

    const hasTopDiv =
        hasButtons || hasSearch || hasSettings || hasExport || hasFilter;

    return (
        <>
            <div
                className={twMerge([
                    "rounded-lg border border-c_neutral-300",
                    rootClassName,
                ])}
            >
                <div
                    className={twMerge(
                        "px-6 py-4 flex flex-row justify-between",
                        !hasTopDiv && "py-0",
                    )}
                >
                    {hasButtons && (
                        <ZButtonGroups
                            handleButtonClick={handleButtonsClick}
                            activeButton={activeButton}
                            size="md"
                            buttons={buttons}
                        />
                    )}
                    {(hasSearch ||
                        hasSettings ||
                        hasExport ||
                        hasFilter ||
                        hasAddButton) && (
                        <div
                            className={twMerge(
                                "flex flex-row items-center gap-4",
                                !hasButtons && "w-full",
                            )}
                        >
                            {hasAddButton && (
                                <ZButton
                                    type="button"
                                    size="md"
                                    {...addButtonProps}
                                >
                                    {t("Добавить")}
                                </ZButton>
                            )}
                            {hasSearch && (
                                <ZTextField
                                    formInputSize="md"
                                    startIcon={<TableSearchIcon size="md" />}
                                    className="w-[300px]"
                                    placeholder={t("Поиск")}
                                    onChange={(e) =>
                                        setNewValues({
                                            search: e.target.value.trim(),
                                        })
                                    }
                                />
                            )}
                            {hasFilter && (
                                <FilterButton
                                    FilterComponent={filter?.FilterComponent}
                                    className={!hasButtons ? "ml-auto" : ""}
                                />
                            )}
                            {hasExport && (
                                <ExportButton
                                    className={
                                        !hasButtons && !hasFilter
                                            ? "ml-auto"
                                            : ""
                                    }
                                />
                            )}
                            {hasSettings && (
                                <SettingsButton
                                    className={
                                        !hasButtons && !hasExport && !hasFilter
                                            ? "ml-auto"
                                            : ""
                                    }
                                />
                            )}
                        </div>
                    )}
                </div>
                {loading ? (
                    <TableLoader />
                ) : (
                    <div className="overflow-x-auto w-full">
                        <div className={twMerge("min-w-[1100px]")}>
                            <div className="grid-header item-center flex border-b border-c_neutral-100 [&>div]:bg-c_neutral-25">
                                {hasOrder && (
                                    <div
                                        className={twMerge(
                                            headerCellGeneralStyle,
                                            "flex items-center justify-center pl-3 pr-3 py-3 w-[60px]",
                                        )}
                                    >
                                        №
                                    </div>
                                )}
                                {hasCheckbox && (
                                    <div
                                        onClick={(e) => e.stopPropagation()}
                                        className={twMerge([
                                            headerCellGeneralStyle,
                                            "flex items-center justify-center pl-6 pr-3 py-3 w-[60px]",
                                            scrollable && "flex-shrink-0",
                                            hasOrder && "pl-0",
                                        ])}
                                    >
                                        <ZCheckbox className="w-5 h-5" />
                                    </div>
                                )}

                                {columns?.map((column, i: number) => {
                                    return (
                                        <div
                                            className={twMerge([
                                                headerCellGeneralStyle,
                                                "text-c_neutral-500 px-6",
                                                column.align === "right" &&
                                                    "text-right",
                                                column.align === "center" &&
                                                    "text-center",
                                                (hasCheckbox || hasOrder) && i === 0
                                                    ? "px-0 pr-6 pl-0"
                                                    : "",
                                                column.headerClassName,
                                                column.width,
                                                scrollable && "flex-shrink-0",
                                            ])}
                                            key={i}
                                        >
                                            {column.header || (
                                                <span
                                                    className={twMerge([
                                                        "text-b-3-m",
                                                    ])}
                                                >
                                                    {column.label}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}

                                {hasActions && (
                                    <div className={twMerge("flex-1")} />
                                )}
                            </div>
                            {rows?.length === 0 ? (
                                <TablePlaceholder placeholder={""} />
                            ) : (
                                <div
                                    className="grid-body w-full"
                                    onClick={handleBodyClick}
                                >
                                    {rows?.map((row, i) => {
                                        return (
                                            <div
                                                key={i}
                                                data-row
                                                data-index={i}
                                                data-id={row[keyExtractor]}
                                                className={twMerge([
                                                    "data-grid-row xl:static lg:relative  w-full flex items-center border-b  border-c_neutral-100",
                                                    rowClassName,
                                                    "hover:bg-c_neutral-50 transition-all duration-200 cursor-pointer",
                                                ])}
                                                onClick={() => {
                                                    handleRowClick &&
                                                        handleRowClick(
                                                            row[keyExtractor],
                                                            i,
                                                        );
                                                }}
                                                onDoubleClick={() =>
                                                    handleRowDoubleClick &&
                                                    handleRowDoubleClick(
                                                        row[keyExtractor],
                                                        i,
                                                    )
                                                }
                                            >
                                                {hasOrder && (
                                                    <div
                                                        className={twMerge(
                                                            headerCellGeneralStyle,
                                                            "flex items-center justify-center py-3 pl-3 pr-3 w-[60px]",
                                                        )}
                                                    >
                                                        {page * size + i + 1}
                                                    </div>
                                                )}
                                                {hasCheckbox && (
                                                    <div
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        className={twMerge([
                                                            headerCellGeneralStyle,
                                                            "flex flex-none items-center justify-center pl-6 pr-3 py-3 w-[60px]",
                                                            scrollable ===
                                                                "flex-shrink-0",
                                                            hasOrder && "pl-0",
                                                        ])}
                                                    >
                                                        <ZCheckbox className="w-5 h-5" />
                                                    </div>
                                                )}

                                                {columns?.map(
                                                    (column, k: number) => {
                                                        const {
                                                            cellRender,
                                                            className,
                                                            headerClassName,
                                                            align,
                                                            truncated,
                                                            key,
                                                            width,
                                                        } = column;

                                                        const externalClassName = `${className || ""} ${
                                                            headerClassName ||
                                                            "w-52"
                                                        } ${k === 0 && (hasCheckbox || hasOrder) ? "px-0 pr-6 pl-0" : ""} ${width}`;

                                                        if (cellRender) {
                                                            return (
                                                                <DataGridCell
                                                                    scrollable={
                                                                        scrollable
                                                                    }
                                                                    className={
                                                                        externalClassName
                                                                    }
                                                                    key={String(
                                                                        k,
                                                                    )}
                                                                >
                                                                    {cellRender(
                                                                        row,
                                                                        i,
                                                                        row?.[
                                                                            column
                                                                                .key
                                                                        ] || "",
                                                                    )}
                                                                </DataGridCell>
                                                            );
                                                        }

                                                        return (
                                                            <DataGridCell
                                                                align={align}
                                                                className={
                                                                    externalClassName
                                                                }
                                                                key={String(
                                                                    key,
                                                                )}
                                                                width={
                                                                    column.width
                                                                }
                                                                scrollable={
                                                                    scrollable
                                                                }
                                                            >
                                                                {!truncated ? (
                                                                    row[
                                                                        column
                                                                            .key
                                                                    ]
                                                                ) : (
                                                                    <p
                                                                        className={twMerge(
                                                                            [
                                                                                "line-clamp-1 overflow-hidden overflow-ellipsis break-all",
                                                                            ],
                                                                        )}
                                                                    >
                                                                        {
                                                                            row[
                                                                                column
                                                                                    .key
                                                                            ]
                                                                        }
                                                                    </p>
                                                                )}
                                                            </DataGridCell>
                                                        );
                                                    },
                                                )}

                                                {hasActions && (
                                                    <div
                                                        className={twMerge(
                                                            "ml-auto shrink-0",
                                                            actionsType ===
                                                                "context-menu" &&
                                                                "w-10",
                                                            actionsType ===
                                                                "buttons" &&
                                                                "w-20",
                                                        )}
                                                    >
                                                        {actionsType ===
                                                        "context-menu" ? (
                                                            <ZContextMenu
                                                                list={contextMenu.map(
                                                                    (item) => ({
                                                                        ...item,
                                                                        value: row[
                                                                            keyExtractor
                                                                        ],
                                                                    }),
                                                                )}
                                                            >
                                                                <IconButton variant="text">
                                                                    <MoreVerticalIcon size="md" />
                                                                </IconButton>
                                                            </ZContextMenu>
                                                        ) : (
                                                            <div className="flex items-center justify-between">
                                                                {actionButtons?.map(
                                                                    (
                                                                        {
                                                                            children,
                                                                            onClick,
                                                                            ...rest
                                                                        },
                                                                        i,
                                                                    ) => (
                                                                        <IconButton
                                                                            key={
                                                                                i
                                                                            }
                                                                            variant="text"
                                                                            placeholder=""
                                                                            onClick={() =>
                                                                                onClick &&
                                                                                onClick(
                                                                                    row,
                                                                                )
                                                                            }
                                                                            {...rest}
                                                                        >
                                                                            {
                                                                                children
                                                                            }
                                                                        </IconButton>
                                                                    ),
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {withPagination &&
                    typeof pagination?.totalPages === "number" &&
                    pagination.totalPages !== 0 && (
                        <div className="p-4">
                            <ZPagination
                                totalPages={pagination.totalPages}
                                defaultPage={pagination.defaultPage}
                            />
                        </div>
                    )}
            </div>
        </>
    );
};

export default ZDataGrid;
