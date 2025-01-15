import { useCallback, useEffect } from "react";

/**
 * Custom React hook that adds beforeunload event listener to the window.
 * This hook can be used to prompt the user before leaving the page.
 *
 * @param {boolean} [enabled=false] - Determines whether the beforeunload event listener is enabled.
 *
 * @returns {void}
 */
const useBeforeUnload = (enabled = false) => {
    /**
     * Event handler for the beforeunload event.
     *
     * @param {BeforeUnloadEvent} e - The beforeunload event object.
     *
     * @returns {void}
     */
    const handleBeforeUnload = useCallback(
        (e: BeforeUnloadEvent) => {
            if (!enabled) {
                return;
            }

            e.preventDefault();
            e.returnValue = true;
        },
        [enabled],
    );

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [handleBeforeUnload]);
};

export default useBeforeUnload;
