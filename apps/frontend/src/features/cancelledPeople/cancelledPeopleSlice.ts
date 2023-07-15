import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeopleBase } from "../../interfaces/IPeopleBase";

export interface PeopleCancelled extends IPeopleBase {
    cancelled_asunt: string;
}

const initialState: Array<PeopleCancelled> = [];

const cancelledPeopleSlice = createSlice({
    name: "cancelledPeople",
    initialState,
    reducers: {
        setCancelledPeople: (
            _state,
            { payload }: PayloadAction<Array<PeopleCancelled>>
        ): Array<PeopleCancelled> => payload,
    },
});

export const { setCancelledPeople } = cancelledPeopleSlice.actions;

export default cancelledPeopleSlice.reducer;
