import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPeopleBase } from "../../interfaces/IPeopleBase";

export interface PeopleCancelled extends IPeopleBase {
  cancellation_subject: string;
}

const initialState: Array<PeopleCancelled> = [];

const cancelledPeopleSlice = createSlice({
  name: "cancelledPeople",
  initialState,
  reducers: {
    setCancelledPeople(
      _state,
      { payload }: PayloadAction<Array<PeopleCancelled>>
    ): Array<PeopleCancelled> {
      return payload;
    },
  },
});

export const { setCancelledPeople } = cancelledPeopleSlice.actions;

export default cancelledPeopleSlice.reducer;
