import CheckMarkIcon from "@/components/icons/CheckMarkIcon";
import InfoCircleIcon from "@/components/icons/InfoCircleIcon";
import JpgFileIcon from "@/components/icons/JpgFileIcon";
import PaperDownloadIcon from "@/components/icons/PaperDownloadIcon";
import PdfIcon from "@/components/icons/PdfIcon";
import TableEdit from "@/components/icons/TableEdit";
import TablePlayIcon from "@/components/icons/TablePlayIcon";
import TableTrash from "@/components/icons/TableTrash";
import WordIcon from "@/components/icons/WordIcon";
import XlsxIcon from "@/components/icons/XlsxIcon";
import { FileModel } from "@/data/file-upload";
import {
    frontOfficeUploadFileRequest,
    hrUploadFileRequest,
} from "@/data/file-upload/file-upload.requests";
import { UploadedFileType } from "@/types/ui.types";
import {
    formatFileSize,
    getFileExtension,
    getFilePath,
    isImage,
} from "@/utils/common";
import { IconButton } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosProgressEvent, AxiosResponse } from "axios";
import get from "lodash.get";
import {
    ChangeEvent,
    ComponentPropsWithoutRef,
    FC,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react";
import { twMerge } from "tailwind-merge";
import ZButton from "../../ZButton";
import ZTruncatedText from "../../ZTruncatedText";
import ZFormLabel from "../ZFormLabel";
import ZHelperText from "../ZHelperText";
import FileViewer from "./FileViewer";
import Skeleton from "react-loading-skeleton";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface FileUploaderWrapperProps extends ComponentPropsWithoutRef<"div"> {
    helperText?: ReactNode;
    hasError?: boolean;
    label?: ReactNode;
    size?: "md" | "sm";
    errors?: Record<string, any>;
    name?: string;
    fullWidth?: boolean;
}

const FileUploaderWrapper: FC<FileUploaderWrapperProps> = ({
    children,
    className,
    label,
    size,
    errors = {},
    fullWidth,
    ...computedProps
}) => {
    const helperText =
        computedProps.helperText ||
        get(errors, `${computedProps.name}.message`);
    const hasError =
        computedProps.hasError ||
        (computedProps.name && Object.hasOwn(errors, computedProps.name));
    return (
        <div className="flex flex-col">
            {label && <ZFormLabel className="mb-[6px]">{label}</ZFormLabel>}
            <div
                className={twMerge(
                    "flex flex-col p-6 gap-4 rounded-[8px] border border-c_neutral-300",
                    className,
                    size === "md" && "w-[376px]",
                    size === "sm" && "w-[240px]",
                    fullWidth && "w-full",
                    hasError && "border-[#F04438]",
                )}
                {...computedProps}
            >
                {children}
            </div>
            {helperText && (
                <ZHelperText
                    className="mt-[6px]"
                    {...(hasError && { variant: "error" })}
                >
                    {helperText}
                </ZHelperText>
            )}
        </div>
    );
};

interface ZFileUploaderProps {
    whiteList?: string[];
    accept?: string;
    hasError?: boolean;
    helperText?: ReactNode;
    label?: ReactNode;
    name?: string;
    onChange?: (
        name: string,
        value: FileModel,
        enabledTrigger?: boolean,
    ) => void;
    size?: "md" | "sm";
    errors?: Record<string, any>;
    inputType?: string;
    value?: FileModel;
    server?: "hr" | "front-office";
    isPhoto?: boolean;
    readonly?: boolean;
    fullWidth?: boolean;
    endpoint?: () => Promise<AxiosResponse<any, any>>;
    handleSuccess?: (res: AxiosResponse) => void;
    handleError?: (err: AxiosError) => void;
    mode?: "local" | "server";
    withView?: boolean;
    loading?: boolean;
}

const ZFileUploader: FC<ZFileUploaderProps> = (props) => {
    const {
        whiteList = [],
        accept = "",
        hasError,
        helperText,
        label,
        size = "md",
        errors,
        onChange,
        name,
        server = "front-office",
        value,
        readonly = false,
        fullWidth = false,
        endpoint,
        handleSuccess,
        handleError,
        mode = "server",
        withView = true,
        loading = false,
    } = props;
    const { t } = useAppTranslations();
    const fileInputRef = useRef<HTMLInputElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [localSrc, setLocalSrc] = useState<null | string>(null);
    const [progress, setProgress] = useState<number>(0);
    const [status, setStatus] = useState<
        "idle" | "success" | "error" | "pending"
    >("idle");

    const fileExtension = getFileExtension(value?.fileName || "") || "";
    const isPhoto = value?.fileName && isImage(value?.fileName);
    const [openFileViewer, setOpenFileViewer] = useState(false);

    const endpoints: Record<string, any> = {
        hr: hrUploadFileRequest,
        ["front-office"]: frontOfficeUploadFileRequest,
    };

    const handleFileChange = () => {
        fileInputRef.current?.click();
    };

    const src = getFilePath(value?.filePath);

    useEffect(() => {
        if (value?.id || loading) {
            setStatus("success");
        }
    }, [value, loading]);

    const uploadMutation = useMutation({
        mutationFn: endpoint || endpoints[server],
        mutationKey: ["upload"],
        onSuccess: (res: AxiosResponse) => {
            if (handleSuccess) {
                return handleSuccess(res);
            }

            const { data } = res;

            setStatus("success");

            if (Array.isArray(data) && data.length > 0 && onChange) {
                onChange(name || "", data[0], true);
            }
        },
        onError: (err: AxiosError) => {
            setStatus("error");
            if (handleError) {
                return handleError(err);
            }
        },
    });

    const onUploadProgress = (event: AxiosProgressEvent) => {
        const percentCompleted = Math.round(
            (event.loaded * 100) / (event.total || 1),
        );
        setProgress(percentCompleted);
    };

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = (e.target.files || []) as UploadedFileType[];

        if (files?.length > 0) {
            const file = files[0];

            const formData = new FormData();
            formData.append("files", file as any);

            onChange &&
                onChange(name || "", {
                    fileName: file.name,
                    fileSize: file.size,
                    contentType: file.type,
                    formData: formData,
                });

            if (mode === "local") {
                setStatus("success");

                const reader = new FileReader();
                reader.addEventListener(
                    "load",
                    function () {
                        setLocalSrc(reader.result);
                    },
                    false,
                );

                if (file) {
                    reader.readAsDataURL(file);
                }

                return;
            }

            setStatus("pending");

            uploadMutation.mutate({ formData, onUploadProgress });
        }
    };

    const preview = () => {
        setOpenFileViewer(true);
    };

    const input = (
        <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleUpload}
            {...(accept && { accept })}
        />
    );

    const getSuccessFilePreviewBadge = () => {
        if (isPhoto) {
            return (
                <img
                    src={src}
                    alt=""
                    id="image-preview"
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={preview}
                />
            );
        }

        const extension = fileExtension;

        if (extension.includes("doc")) return <WordIcon size="lg" />;
        if (extension.endsWith("pdf")) return <PdfIcon size="lg" />;
        if (extension.startsWith("xl")) return <XlsxIcon size="lg" />;

        return null;
    };

    const preparedWhiteList = whiteList.map((extension) =>
        extension.toUpperCase(),
    );

    const deleteFile = () => {
        onChange && onChange(name || "", {});
        setStatus("idle");
    };

    switch (status) {
        case "idle":
            return (
                <FileUploaderWrapper
                    name={name}
                    errors={errors}
                    size={size}
                    hasError={hasError}
                    helperText={helperText}
                    label={label}
                    onClick={handleFileChange}
                    className="hover:cursor-pointer transition-all duration-200 hover:border-c_success-500 group items-center border-dashed"
                    fullWidth={fullWidth}
                >
                    <div
                        className={twMerge(
                            "w-[56px] min-w-[56px] transition-all duration-200 flex items-center justify-center h-[56px] rounded-full border border-dashed border-c_neutral-300 bg-c_neutral-50",
                            "group-hover:bg-c_success-50",
                        )}
                    >
                        {/* TODO static color has been used */}
                        <PaperDownloadIcon
                            size="lg"
                            className="group-hover:[&_path]:stroke-[#12B76A] transition-all duration-200"
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-b-2-m mb-[2px] font-medium text-c_neutral-800">
                            Выберете файл или переместите его сюда
                        </p>
                        <p className="text-b-2-r text-c_neutral-500">
                            {preparedWhiteList.length === 1 &&
                                `${preparedWhiteList[0]} файлы не больше 10MB`}
                            {preparedWhiteList.length === 2 &&
                                `${preparedWhiteList[0]} и ${preparedWhiteList[1]} файлы не больше 10MB`}
                            {preparedWhiteList.length > 2 &&
                                `${preparedWhiteList.slice(0, preparedWhiteList.length - 1).join(", ")} или ${preparedWhiteList.at(-1)} файлы не больше 10MB`}
                        </p>
                    </div>

                    <ZButton size="md" variant="secondary" type="button">
                        Выбрать файл
                    </ZButton>
                    {input}
                </FileUploaderWrapper>
            );
        case "pending":
            return (
                <FileUploaderWrapper
                    name={name}
                    errors={errors}
                    size={size}
                    hasError={hasError}
                    helperText={helperText}
                    label={label}
                    fullWidth={fullWidth}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-[56px] min-w-[56px] flex items-center justify-center h-[56px] rounded-full border border-dashed border-c_neutral-300 bg-c_neutral-50">
                            <JpgFileIcon size="lg" />
                        </div>
                        <p>Загрузка файла...</p>
                        <span className="flex ml-auto w-5 h-5 rounded-full bg-c_success-500 items-center justify-center">
                            <CheckMarkIcon
                                className="[&_path]:stroke-white"
                                size="sm"
                            />
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            style={{ width: `${progress}%` }}
                            className="h-2.5 rounded-full transition-all bg-c_success-500"
                        />
                    </div>

                    {input}
                </FileUploaderWrapper>
            );
        case "success":
            return (
                <FileUploaderWrapper
                    name={name}
                    errors={errors}
                    hasError={hasError}
                    helperText={helperText}
                    label={label}
                    size={size}
                    fullWidth={fullWidth}
                >
                    <div className="flex">
                        <div className="w-[46px] min-w-[46px] mr-5">
                            {!loading ? (
                                getSuccessFilePreviewBadge()
                            ) : (
                                <Skeleton width={40} height={40} />
                            )}
                        </div>
                        <div>
                            <ZTruncatedText className="text-b-2-m text-c_neutral-800 mb-1">
                                {!loading ? (
                                    value?.fileName
                                ) : (
                                    <Skeleton height={20} width={160} />
                                )}
                            </ZTruncatedText>
                            <span className="text-b-2-r text-c_neutral-500">
                                {!loading ? (
                                    formatFileSize(value?.fileSize)
                                ) : (
                                    <Skeleton width={36} height={20} />
                                )}
                            </span>
                        </div>
                        {!readonly && (
                            <div className={twMerge(["ml-auto flex", loading && 'gap-1'])}>
                                {!loading ? (
                                    <IconButton
                                        placeholder=""
                                        size="sm"
                                        variant="text"
                                        onClick={handleFileChange}
                                    >
                                        <TableEdit size="md" />
                                    </IconButton>
                                ) : (
                                    <Skeleton width={30} height={30} />
                                )}
                                {!loading ? (
                                    <IconButton
                                        placeholder=""
                                        size="sm"
                                        variant="text"
                                        onClick={deleteFile}
                                    >
                                        <TableTrash
                                            size="md"
                                            className="[&_path]:stroke-c_error-500"
                                        />
                                    </IconButton>
                                ) : (
                                    <Skeleton width={30} height={30} />
                                )}
                            </div>
                        )}
                        <FileViewer
                            open={openFileViewer}
                            src={src}
                            extension={fileExtension}
                            fileName={value?.fileName || ""}
                            handleClose={() => setOpenFileViewer(false)}
                        />
                    </div>

                    {withView && (
                        <div className="flex gap-1 items-center">
                            <IconButton
                                size="sm"
                                variant="text"
                                placeholder={undefined}
                                onClick={preview}
                            >
                                {!loading ? (
                                    <TablePlayIcon
                                        size="md"
                                        className="[&_path]:stroke-[#2E90FA]"
                                    />
                                ) : (
                                    <Skeleton width={20} height={20} />
                                )}
                            </IconButton>{" "}
                            {/* TODO static color has been used */}
                            <span
                                className="text-[#2E90FA] cursor-pointer"
                                onClick={preview}
                            >
                                {!loading ? (
                                    t("Просмотр")
                                ) : (
                                    <Skeleton width={100} height={20} />
                                )}
                            </span>
                            {input}
                        </div>
                    )}
                </FileUploaderWrapper>
            );
        case "error":
            return (
                // TODO has been used static color
                <FileUploaderWrapper
                    errors={errors}
                    hasError={hasError}
                    helperText={helperText}
                    label={label}
                    className="border-[#F04438]"
                    size={size}
                    name={name}
                    fullWidth={fullWidth}
                >
                    <div className="flex">
                        {/* TODO has been used static color */}
                        <div className="w-[56px] h-[56px] min-w-[56px] rounded-full mr-5 flex items-center justify-center bg-[#FEECEB]">
                            {/* TODO has been used static color */}
                            <InfoCircleIcon
                                size="lg"
                                className="[&_path]:stroke-[#F04438]"
                            />
                        </div>
                        <div>
                            <ZTruncatedText className="text-b-2-m text-c_neutral-800 mb-1">
                                {value?.fileName}
                            </ZTruncatedText>
                            <span className="text-b-2-r text-c_neutral-500">
                                {formatFileSize(value?.fileSize)}
                            </span>
                        </div>
                        <ZButton
                            size="sm"
                            variant="secondary"
                            className="ml-auto"
                            type="button"
                            onClick={handleFileChange}
                        >
                            Перезагрузить
                        </ZButton>
                        {input}
                    </div>
                    {/* TODO has been used static color */}
                    <p className="text-b-2-r mt-6 text-[#F04438]">
                        Ошибка загрузки файла! Попробуйте заново!
                    </p>
                </FileUploaderWrapper>
            );
        default:
            return null;
    }
};

export default ZFileUploader;
