"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode, FC } from "react";

interface ProviderProps {
    children: ReactNode;
}

const ReduxProvider: FC<ProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
