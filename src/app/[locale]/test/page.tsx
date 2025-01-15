"use client";
import ZButton from "@/components/z-components/ZButton";
import { addKeyTranslation } from "@/data/translation";
import { useAppDispatch } from "@/hooks/helpers/useAppDispatch";
import { setNewWord } from "@/providers/redux/slices/translation";
import { useMutation } from "@tanstack/react-query";
import get from "lodash.get";

const Page = () => {
    const dispatch = useAppDispatch();
    const { isPending } = useMutation({
        mutationFn: addKeyTranslation,
        mutationKey: ["add-key"],
        onSuccess: ({ data }) => {
            const key = get(data, "result.data[0].key");
            dispatch(setNewWord({ [key]: "" }));
        },
    });

    return (
        <div>
            <ZButton pending={isPending}>Refresh translation list</ZButton>
        </div>
    );
};

export default Page;
