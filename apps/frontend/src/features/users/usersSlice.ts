import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserBase } from '../../interfaces/IUserBase';

export interface User extends IUserBase {
  first_name: string;
  last_name: string;
  phone_number: string;
  role_name: string;
}

export interface FormData {
  role_id: string;
  first_name: string;
  last_name: string;
  document_id: string;
  document_number: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirm: string;
}

interface AdminState {
  users: Array<User>;
  formData: FormData;
}

const initialState: AdminState = {
  users: [],
  formData: {
    role_id: '',
    first_name: '',
    last_name: '',
    document_id: '',
    document_number: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirm: '',
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<Array<User>>): AdminState {
      return { ...state, users: payload };
    },
    setFormData(state, { payload }: PayloadAction<FormData>): AdminState {
      return { ...state, formData: payload };
    },
    resetFormDataAdmin(state) {
      return { ...state, formData: initialState.formData };
    },
  },
});

export const { setUsers, setFormData, resetFormDataAdmin } = adminSlice.actions;

export default adminSlice.reducer;
