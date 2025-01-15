import { FC } from "react";
import ZButton from "../ZButton";
import TableExportIcon from "@/components/icons/TableExportIcon";
import useZDataGridContext from "./ZDataGridProvider/useZDataGridContext";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface ExportButtonProps {
    className?: string;
}

const ExportButton: FC<ExportButtonProps> = () => {
    const { t } = useAppTranslations();
    const {
        handleExport,
        exportQuery: { isLoading },
    } = useZDataGridContext();

    return (
        <ZButton
            onClick={handleExport}
            variant="secondary"
            size="md"
            startIcon={<TableExportIcon />}
            pending={isLoading}
        >
            {t('Экспорт')}
        </ZButton>
    );
};

export default ExportButton;
