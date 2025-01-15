"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NavbarSliceType = {
    sidebarView: boolean;
    contentLayoutWidth: number | null;
    inProcessModal: boolean;
};

const initialState = {
    sidebarView: false,
    contentLayoutWidth: null,
    inProcessModal: false,
} as NavbarSliceType;

export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setSidebarView: (state, action) => {
            state.sidebarView = action.payload;
        },
        setContentLayoutWidth: (state, action: PayloadAction<number>) => {
            state.contentLayoutWidth = action.payload;
        },
        toggleInProcessModal: (state) => {
            state.inProcessModal = !state.inProcessModal;
        },
    },
});

export const { setSidebarView, setContentLayoutWidth, toggleInProcessModal } =
    navbarSlice.actions;

export default navbarSlice.reducer;
