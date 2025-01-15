import type { AppDispatch } from "@/providers/redux/store";
import { useDispatch } from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
