"use client";
import { createPortal } from "react-dom";
import { useClickAway } from "@uidotdev/usehooks";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import Cross from "@/components/icons/Cross";
import { TButton } from "@zaytun/components";
import {
    CSSProperties,
    FC,
    Fragment,
    ReactNode,
    cloneElement,
    useEffect,
    useRef,
    useState,
} from "react";
import Select, {
    ClearIndicatorProps,
    Props as ReactSelectProps,
    DropdownIndicatorProps,
    components,
    MenuProps,
    OptionProps,
} from "react-select";
import { twMerge } from "tailwind-merge";
import { ZHelperText } from "../FormElements";
import { CheckboxValueVariants } from "@/types/ui.types";
import ZFormLabel from "../FormElements/ZFormLabel";
import ZTruncatedText from "../ZTruncatedText";
import get from "lodash.get";
import TranslationSubMenu from "./TranslationSubMenu";
import Skeleton from "react-loading-skeleton";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

const optionClassName =
    "px-4 py-[10px] hover:cursor-pointer text-b-1-r text-c_neutral-600 hover:rounded-md hover:bg-c_neutral-50";

const ClearIndicator = (props: ClearIndicatorProps<any, any>) => {
    const {
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props;

    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={{
                ...(getStyles("clearIndicator", props) as CSSProperties),
                paddingRight: 0,
            }}
        >
            <div style={{ padding: "0px" }}>
                <Cross size="md" className="[&>path]:stroke-c_neutral-500" />
            </div>
        </div>
    );
};

interface SubmenuProps {
    children?: ReactNode;
    open: boolean;
    menuRect: DOMRect | null;
    toggleSubmenu: () => void;
    refetch?: () => void;
    handleChange: (index: number) => void;
}

const Submenu: FC<SubmenuProps> = ({
    children,
    open,
    menuRect,
    toggleSubmenu,
    refetch,
    handleChange,
}) => {
    const submenuRef = useClickAway((e) => {
        let node = e.target;
        while (node) {
            const isOption = (node?.id || "").startsWith(
                "react-select-2-option",
            );

            if (!isOption) {
                toggleSubmenu();
            } else {
                const index = (node?.id || "").split("-").at(-1);
                handleChange(index);
            }

            node = node.parentNode;
        }
    });

    if (!menuRect || typeof window === "undefined") {
        return;
    }

    const { bottom, right } = menuRect;

    return createPortal(
        <div
            // @ts-expect-error TODO
            ref={submenuRef}
            style={{
                top: `${bottom}px`,
                left: `${right}px`,
            }}
            className={twMerge(
                "w-[320px] z-50 fixed transition-all opacity-0 duration-300",
                open && "opacity-100",
                !open && "overflow-hidden",
            )}
        >
            <div className="w-full rounded-[16px] pt-6 border border-c_neutral-300 bg-white px-4">
                {/* @ts-expect-error TODO */}
                {cloneElement(children, {
                    handleCancel: toggleSubmenu,
                    refetch,
                })}
            </div>
        </div>,
        document.body,
    );
};

const Menu = ({
    withAdd,
    toggleSubMenu,
    menuTitle,
    ...props
}: MenuProps & {
    withAdd?: boolean;
    SubMenu?: any;
    toggleSubMenu: () => void;
    withSelectAll?: boolean;
    allCheckedValue: CheckboxValueVariants;
    handleSelectAll: () => void;
    menuTitle?: ReactNode;
}) => {
    return (
        <Fragment>
            <components.Menu<any, boolean, any> {...props} className="relative">
                {menuTitle && (
                    <span className="w-full flex items-center gap-2 py-[10px] px-4 text-b-2-r text-c_neutral-500">
                        {menuTitle}
                    </span>
                )}
                {/* {withSelectAll && (
          <div className="w-full flex items-center gap-2 py-[10px] px-4">
            <ZCheckbox
              indeterminate={allCheckedValue === 'indeterminate'}
              checked={allCheckedValue === 'checked'}
              onChange={handleSelectAll}
            />
            <span className="text-b-1-m text-c_neutral-600">Выбрать все</span>
          </div>
        )} */}
                {props.children}
                {withAdd && (
                    <div className="w-full flex items-center justify-center">
                        <TButton
                            onClick={toggleSubMenu}
                            variant="text"
                            className="text-c_primary-500 text-body-1-r text-center"
                        >
                            Добавить
                        </TButton>
                    </div>
                )}
            </components.Menu>
        </Fragment>
    );
};

const CustomOption = (props: OptionProps<any, any>) => {
    const {
        children,
        getStyles,
        innerProps: { ref, ...restInnerProps },
        isMulti,
    } = props;

    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={getStyles("option", props) as CSSProperties}
            className={twMerge([optionClassName])}
        >
            <div
                className={twMerge([
                    isMulti && "flex flex-row items-center gap-2",
                ])}
            >
                {/* {isMulti && <ZCheckbox checked={isSelected} />}  */}
                <ZTruncatedText>{children}</ZTruncatedText>
            </div>
        </div>
    );
};

const DropdownIndicator = (props: DropdownIndicatorProps<any, any>) => {
    const {
        getStyles,
        innerProps: { ref, ...restInnerProps },
    } = props;

    return (
        <div
            {...restInnerProps}
            ref={ref}
            style={{
                ...(getStyles("dropdownIndicator", props) as CSSProperties),
                paddingLeft: 0,
            }}
            className="h-9 w-9 pl-0"
        >
            <div className="w-full h-full flex items-center justify-center">
                <ArrowDown2
                    size="md"
                    className="[&>path]:stroke-c_neutral-600"
                />
            </div>
        </div>
    );
};

interface ZReactSelectProps extends ReactSelectProps {
    subMenu?: ReactNode;
    children?: any;
    refetch?: () => void;
    setValue?: (name: string, value: any) => void;
    withSelectAll?: boolean;
    menuTitle?: ReactNode;
    label?: ReactNode;
    helperText?: any;
    hasError?: boolean;
    externalControlClassName?: string;
    externalOptionClassName?: string;
    errors?: any;
    enableMenuPortalTarget?: boolean;
    referenceType?: string;
    rootClassName?: string;
    loading?: boolean;
    isLoadingOptions?: boolean;
}

function ZReactSelect({
    value,
    options = [],
    children,
    refetch,
    onChange,
    name,
    setValue,
    withSelectAll,
    menuTitle,
    label,
    errors = {},
    externalControlClassName,
    externalOptionClassName,
    enableMenuPortalTarget = false,
    referenceType,
    rootClassName,
    loading = false,
    isLoadingOptions = false,
    ...props
}: ZReactSelectProps) {
    const { t } = useAppTranslations();
    const ref = useRef<HTMLDivElement>(null);
    const [menuRect, setMenuRect] = useState<DOMRect | null>(null);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const withAdd = Boolean(children) || Boolean(referenceType);

    const menuRef = useClickAway(() => {
        if (menuIsOpen && !submenuOpen) {
            setMenuIsOpen(false);
        }
    });

    const toggleSubmenu = () => setSubmenuOpen(!submenuOpen);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        setMenuRect(ref.current.getBoundingClientRect());
    }, [ref.current?.getBoundingClientRect().top]);

    const allChecked: CheckboxValueVariants = !Array.isArray(value)
        ? "unchecked"
        : value.length === options.length
          ? "checked"
          : value.length < options.length && value.length !== 0
            ? "indeterminate"
            : "unchecked";

    const handleSelectAll = () => {
        if (!setValue || !name) {
            return;
        }

        switch (allChecked) {
            case "unchecked":
            case "indeterminate":
                setValue(name, options);
                break;
            case "checked":
                setValue(name, []);
                break;

            default:
                break;
        }
    };

    const handleChange = (index: number) => {
        const selectedOption = options[index];

        if (props.isMulti) {
            const arrayValue = [
                ...(Array.isArray(value) ? value : []),
                selectedOption,
            ];

            onChange &&
                onChange(arrayValue, {
                    action: "select-option",
                    option: undefined,
                    name,
                });

            setValue && name && setValue(name, arrayValue);
        } else {
            onChange &&
                onChange(selectedOption, {
                    action: "select-option",
                    option: undefined,
                    name,
                });

            setValue && name && setValue(name, selectedOption);
        }

        setMenuIsOpen(false);
    };

    const helperText =
        props.helperText ||
        (name
            ? get(errors, `${name}.message`) ||
              get(errors, `${name}.label.message`)
            : "");

    const hasError =
        props.hasError ||
        (name && Object.hasOwn(errors, name)) ||
        Object.hasOwn(errors, `${name}.label`);

    return (
        <>
            {/* @ts-expect-error TODO */}
            <div ref={menuRef} className={rootClassName}>
                {label && (
                    <ZFormLabel
                        disabled={props.isDisabled}
                        className="mb-[6px]"
                    >
                        {label}
                    </ZFormLabel>
                )}
                {!loading ? (
                    <div className="w-full" ref={ref}>
                        <Select
                            menuIsOpen={menuIsOpen}
                            onMenuOpen={() => setMenuIsOpen(!menuIsOpen)}
                            unstyled
                            onChange={(value, action) => {
                                !props.isMulti && setMenuIsOpen(false);
                                setSubmenuOpen(false);
                                setValue && name && setValue(name, value);
                                onChange && onChange(value, action);
                            }}
                            isLoading={isLoadingOptions}
                            options={options}
                            placeholder="-"
                            menuShouldScrollIntoView
                            isMulti={false}
                            isClearable
                            classNames={{
                                control: ({ isFocused }) => {
                                    return twMerge(
                                        "min-h-12 rounded-md cursor-pointer border bg-white shadow-none pl-[14px]",
                                        isFocused
                                            ? "border-c_primary-500"
                                            : "border-c_neutral-300",
                                        hasError ? "border-c_error-400" : "",
                                        externalControlClassName,
                                    );
                                },
                                placeholder: () => "text-c_neutral-500 b-1-r",
                                input: () =>
                                    "[&_input:focus]:ring-0 text-c_neutral-600 b-1-r",
                                menu: () =>
                                    twMerge(
                                        "rounded-lg bg-white border border-c_neutral-300 !top-[110%] p-2",
                                    ),
                                option: () =>
                                    twMerge(
                                        optionClassName,
                                        externalOptionClassName,
                                    ),
                                multiValue: () =>
                                    twMerge(
                                        `mr-1 bg-c_neutral-300 rounded-md my-1`,
                                    ),
                                multiValueRemove: () =>
                                    twMerge(
                                        "hover:bg-c_error-400 py-1 rounded-md rounded-l-none px-1",
                                    ),
                                multiValueLabel: () =>
                                    twMerge(
                                        `py-1 pr-1 pl-2 flex items-center justify-center`,
                                    ),
                            }}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    minHeight: "48px",
                                }),
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 99,
                                    top: `${((base.top as any) || 0) + 5}px`,
                                }),
                            }}
                            components={{
                                IndicatorSeparator: null,
                                DropdownIndicator,
                                ClearIndicator,
                                Menu: (props) => (
                                    <Menu
                                        {...props}
                                        withAdd={withAdd}
                                        toggleSubMenu={toggleSubmenu}
                                        withSelectAll={
                                            withSelectAll && options.length > 0
                                        }
                                        allCheckedValue={allChecked}
                                        handleSelectAll={handleSelectAll}
                                        menuTitle={menuTitle}
                                    />
                                ),

                                Option: CustomOption,
                            }}
                            value={value}
                            menuPosition="absolute"
                            {...(enableMenuPortalTarget && {
                                menuPortalTarget: document.body,
                            })}
                            
                            loadingMessage={() => (
                                <div>{t("Получение необходимых опций")}</div>
                            )}
                            {...props}
                        />
                    </div>
                ) : (
                    <Skeleton className="h-12 w-full" />
                )}
                {helperText && (
                    <ZHelperText
                        {...(hasError && { variant: "error" })}
                        className="mt-[6px]"
                    >
                        {helperText}
                    </ZHelperText>
                )}
            </div>
            {submenuOpen && !referenceType && (
                <Submenu
                    open
                    menuRect={menuRect}
                    toggleSubmenu={toggleSubmenu}
                    refetch={refetch}
                    handleChange={handleChange}
                >
                    {children}
                </Submenu>
            )}

            {submenuOpen && referenceType && (
                <TranslationSubMenu
                    open
                    menuRect={menuRect}
                    toggleSubmenu={toggleSubmenu}
                    refetch={refetch}
                    handleChange={handleChange}
                    referenceType={referenceType}
                />
            )}
        </>
    );
}

export default ZReactSelect;
