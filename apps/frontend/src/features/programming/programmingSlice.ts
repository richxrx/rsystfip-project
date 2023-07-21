import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IKeyBool } from "../../interfaces/IKeyBool";
import { updateFormDataByAction } from "./functions";

export enum AppointmentStatus {
  daily = "daily",
  scheduled = "scheduled",
  cancelled = "cancelled",
}

export interface FormDataState {
  id: string;
  category_id?: string;
  document_number?: string;
  document_id?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  faculty_id?: string;
  visit_subject?: string;
  color?: string;
  start_time?: string;
  end_time?: string;
  status?: AppointmentStatus;
  disabledAll?: boolean;
  disabledAfterAutocomplete?: boolean;
}

interface FormData {
  add: FormDataState;
  edit: FormDataState;
  schedule: FormDataState;
  [action: string]: FormDataState;
}

export const formDataInitialState: FormDataState = {
  id: "",
  category_id: "",
  document_number: "",
  document_id: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  faculty_id: "",
  visit_subject: "",
  color: "#388cdc",
  start_time: "",
  end_time: "",
  status: AppointmentStatus.daily,
  disabledAll: true,
  disabledAfterAutocomplete: false,
};

export interface Deans {
  id: string;
  first_name: string;
  last_name: string;
  faculty_id: string;
}

export interface ProgrammingState {
  formData: FormData;
  deans: Array<Deans>;
}

export const validFormDataAction: IKeyBool = {
  add: true,
  edit: true,
  schedule: true,
};

const initialState: ProgrammingState = {
  formData: {
    add: formDataInitialState,
    edit: formDataInitialState,
    schedule: formDataInitialState,
  },
  deans: [],
};

const programmingSlice = createSlice({
  name: "programming",
  initialState,
  reducers: {
    setFormData(
      state,
      { payload: [action, formData] }: PayloadAction<[string, FormDataState?]>
    ): ProgrammingState {
      return updateFormDataByAction(state, action, formData);
    },
    setDeans(
      state,
      { payload }: PayloadAction<Array<Deans>>
    ): ProgrammingState {
      return { ...state, deans: payload };
    },
    resetAllFormDataProgramming(state): ProgrammingState {
      return { ...state, formData: { ...initialState.formData } };
    },
  },
});

export const { setFormData, setDeans, resetAllFormDataProgramming } =
  programmingSlice.actions;

export default programmingSlice.reducer;
