import { FC } from "react";
import Modal from "@/components/Modal";
import FileViewer from "react-file-viewer";
import { PossibleFileExtensions } from "@/utils/appTypes";
import { isImage } from "@/utils/common";

interface FileViewerProps {
    open: boolean;
    handleClose: () => void;
    src: string;
    extension: PossibleFileExtensions;
    fileName: string;
}

const ZFileViewer: FC<FileViewerProps> = ({
    open,
    handleClose,
    src,
    extension,
    fileName,
}) => {
    return (
        <Modal
            size="lg"
            open={open}
            onHandleChange={handleClose}
            exitButton
            header="Файл"
        >
            <div className="flex h-[70vh] justify-center items-center p-5">
                {extension === "pdf" ? (
                    <iframe src={src} height={"100%"} width="100%" />
                ) : isImage(fileName) ? (
                    <img
                        width="100%"
                        style={{
                            height: "calc(100% - 40px)",
                            objectFit: "contain",
                        }}
                        src={src}
                        alt={fileName}
                    />
                ) : extension === "xlsx" ? (
                    <p>Мы работаем над просмотрщиком Excel</p>
                ) : (
                    <FileViewer filePath={src} fileType={extension} />
                )}
            </div>
        </Modal>
    );
};

export default ZFileViewer;
