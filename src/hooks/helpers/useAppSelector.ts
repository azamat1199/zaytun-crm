import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "@/providers/redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
