import { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const themeColors = require("../../colors.json");

function useColors() {
    const [colors, setColors] = useState(themeColors);

    useEffect(() => {
        setColors(themeColors);
    }, [themeColors]);

    return { colors };
}

export default useColors;
