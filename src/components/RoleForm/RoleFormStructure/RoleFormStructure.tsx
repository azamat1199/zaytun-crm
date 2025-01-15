import XScrollableDiv from "@/components/XScrollableDiv";
import React from "react";
import useRoleFormContext from "../useRoleFormContext";
import Column from "./Column";

const RoleFormStructure = () => {
    const { structure } = useRoleFormContext();
    return (
        <XScrollableDiv className="flex  w-full overflow-x-auto h-[800px] border rounded-md border-neutral-300">
            {Object.values(structure).map(({ content, expanded, next }, i) => (
                <Column
                    next={next}
                    colIndex={i}
                    content={content}
                    key={i}
                    expanded={expanded}
                />
            ))}
        </XScrollableDiv>
    );
};

export default RoleFormStructure;
