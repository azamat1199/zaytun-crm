import { useContext } from "react";
import StructureContext from "../StructureContext";

const useStructureContext = () => {
    const context = useContext(StructureContext);

    if (!context) {
        throw new Error(
            "You should wrap component with StructureProvider 🔥🔥🔥🔥",
        );
    }

    return context;
};

export default useStructureContext;
