"use client";
import { UserRoleModel } from "@/data/user";
import { createSlice } from "@reduxjs/toolkit";

export type PermissionType = {
    id: string;
    code: string;
    orderIndex: number;
    checked?: boolean;
};

export type TabType = {
    id: string;
    code: string;
    checked?: boolean;
    orderIndex: number;
    permissionMap: Record<string, boolean>;
    permissions: PermissionType[];
};

export type PageType = {
    code: string;
    pageUrl: string;
    tabs: TabType[];
    id: string;
    orderIndex: number;
    permissions: PermissionType[];
    checked?: boolean;
};

export type SubModuleType = {
    code: string;
    initialPage: string;
    pages: PageType[];
    id: string;
    orderIndex: number;
    checked?: boolean;
};

export type ModuleType = {
    code: string;
    initialPage: string;
    subModules: SubModuleType[];
    id: string;
    orderIndex: number;
    checked?: boolean;
};

type UserSliceType = {
    info: {
        id: string | null;
        firstName: string | null;
        lastName: string | null;
        roles: UserRoleModel[];
    };
    modules: Record<string, ModuleType>;
    allSubModules: SubModuleType[];
    allPages: PageType[];
    allTabs: TabType[];
};

const initialState: UserSliceType = {
    info: {
        id: null,
        firstName: null,
        lastName: null,
        roles: [],
    },
    modules: {},
    allSubModules: [],
    allPages: [],
    allTabs: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setInitialUserData: (state, action) => {
            const { modules } = action.payload;
            const subModules = action.payload.modules.reduce(
                (acc: SubModuleType[], cur: ModuleType) => [
                    ...acc,
                    ...cur.subModules,
                ],
                [],
            );
            const pages = subModules.reduce(
                (acc: PageType[], cur: SubModuleType) => [...acc, ...cur.pages],
                [],
            );
            const tabs = pages.reduce(
                (acc: TabType[], cur: PageType) => [...acc, ...cur.tabs],
                [],
            );
            state.modules = modules.reduce(
                (acc: Record<string, ModuleType>, cur: ModuleType) => ({
                    ...acc,
                    [cur.code]: cur,
                }),
                {},
            );
            state.info = action.payload.info;
            state.allSubModules = subModules;
            state.allPages = pages;
            state.allTabs = tabs;
        },
    },
});

export const { setInitialUserData } = userSlice.actions;

export default userSlice.reducer;
