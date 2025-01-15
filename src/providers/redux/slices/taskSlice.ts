"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TaskSliceType = {
    task: any;
};

const initialState = {
    task: null,
} as TaskSliceType;

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setTask: (state, action: PayloadAction<any>) => {
            state.task = action.payload;
        },
    },
});

export const { setTask } = taskSlice.actions;

export default taskSlice.reducer;
