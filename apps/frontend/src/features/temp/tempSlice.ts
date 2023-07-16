import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserBase } from "../../interfaces/IUserBase";

export interface TempState {
  tempDataForChangePsw: IUserBase;
}

const initialState: TempState = {
  tempDataForChangePsw: {
    id: 0,
    email: "",
  },
};

const tempSlice = createSlice({
  name: "extras",
  initialState,
  reducers: {
    setTempDataForChangePsw: function (
      state,
      { payload }: PayloadAction<IUserBase>
    ): TempState {
      return { ...state, tempDataForChangePsw: payload };
    },
    destroyTemporals(): TempState {
      return initialState;
    },
  },
});

export const { setTempDataForChangePsw, destroyTemporals } = tempSlice.actions;

export default tempSlice.reducer;
