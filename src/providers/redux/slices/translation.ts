"use client";
import {
    TranslationKeyModel,
    TranslationOptionsType,
} from "@/data/translation";
import { mappedFrontServerTranslationLangs } from "@/utils/language";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TranslationStateType = {
    messages: Record<string, string>;
    lang: TranslationOptionsType;
};

const initialState: TranslationStateType = {
    messages: {},
    lang: "ru",
};

export const translationSlice = createSlice({
    name: "translation",
    initialState,
    reducers: {
        setKeys: (state, action: PayloadAction<TranslationKeyModel[]>) => {
            Object.keys(mappedFrontServerTranslationLangs).forEach((locale) => {
                action.payload.forEach((item) => {
                    state.messages[locale] = {
                        // @ts-expect-error TODO
                        ...state.messages?.[locale],
                        // @ts-expect-error TODO
                        ...(item.key && {
                            [item.key]:
                                item?.translation?.[
                                    mappedFrontServerTranslationLangs[locale]
                                ] || "",
                        }),
                    };
                });
            });
        },
        setLang: (state, action: PayloadAction<TranslationOptionsType>) => {
            state.lang = action.payload;
        },
        setNewWord: (state, action: PayloadAction<Record<string, string>>) => {
            state.messages[state.lang] = {
                ...state.messages[state.lang],
                ...action.payload,
            };
        },
    },
});

export const { setKeys, setLang, setNewWord } = translationSlice.actions;

export default translationSlice.reducer;
