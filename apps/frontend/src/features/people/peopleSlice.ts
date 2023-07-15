import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeopleBase } from "../../interfaces/IPeopleBase";

export interface People extends IPeopleBase {
    come_asunt: string;
}

interface PeopleState {
    people: Array<People>;
    peopleOrigen: Array<People>;
    find: string;
}

const initialState: PeopleState = {
    people: [],
    peopleOrigen: [],
    find: "",
};

const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        setPeople: (
            state,
            { payload }: PayloadAction<Array<People>>
        ): PeopleState => ({
            ...state,
            people: payload,
        }),
        setPeopleOrigen: (
            state,
            { payload }: PayloadAction<Array<People>>
        ): PeopleState => ({ ...state, peopleOrigen: payload }),

        setFind: (state, { payload }: PayloadAction<string>): PeopleState => ({
            ...state,
            find: payload,
        }),
    },
});

export const { setPeople, setPeopleOrigen, setFind } = peopleSlice.actions;

export default peopleSlice.reducer;
