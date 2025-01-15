import { isPlainObject } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";

const useSetDefaultValues = (
    reset: (values: any) => void,
    defaultValues: Record<string, any>,
) => {
    const initiated = useRef(false);

    useEffect(() => {
        if (initiated.current) {
            return;
        }

        if (isPlainObject(defaultValues) && defaultValues.id) {
            reset(defaultValues);
            initiated.current = true;
        }
    }, [defaultValues]);
};

export default useSetDefaultValues;
