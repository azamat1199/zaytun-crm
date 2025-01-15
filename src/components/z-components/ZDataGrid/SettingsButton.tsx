import { FC } from "react";
import ZButton from "../ZButton";
import TableSettingsIcon from "@/components/icons/TableSettingsIcon";

interface SettingsButtonsProps {
    className?: string;
}

const SettingsButton: FC<SettingsButtonsProps> = ({ className }) => {
    return (
        <ZButton iconButton size="md" variant="secondary" className={className}>
            <TableSettingsIcon />
        </ZButton>
    );
};

export default SettingsButton;
