import { FC } from "react";
import JpgFileIcon from "../icons/JpgFileIcon";
import PdfIcon from "../icons/PdfIcon";
import PngFileIcon from "../icons/PngFileIcon";
import WordIcon from "../icons/WordIcon";

interface FileExtensionProps {
    size?: "lg" | "md";
    extension: "pdf" | "doc" | "docx" | "png" | "jpeg" | "jpg";
}

const FileExtension: FC<FileExtensionProps> = (props) => {
    const { extension, size = "lg" } = props;

    const preparedExtension = extension.toLowerCase();

    switch (preparedExtension) {
        case "doc":
        case "docx":
            return <WordIcon size={size} />;
        case "pdf":
            return <PdfIcon size={size} />;
        case "jpeg":
        case "jpg":
            return <JpgFileIcon size={size} />;
        case "png":
            return <PngFileIcon size={size} />;
        default:
            return null;
    }
};

export default FileExtension;
