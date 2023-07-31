import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AUTH_KEY } from '../../constants';
import { ObjsHasSameStructure } from '../../libs/utils';

interface UserAuth {
  iat: number;
  exp: number;
  id: number;
  role_name: string;
  first_name: string;
  last_name: string;
  email: string;
  permissions: Array<string>;
}

export interface AuthState {
  auth: boolean;
  userAuth: UserAuth;
  token: string;
}

const initialState: AuthState = {
  auth: false,
  userAuth: {
    iat: 0,
    exp: 0,
    id: 0,
    role_name: '',
    first_name: '',
    last_name: '',
    email: '',
    permissions: [],
  },
  token: '',
};

const userSessionSaved: AuthState = JSON.parse(
  window.localStorage.getItem(AUTH_KEY) || JSON.stringify({}),
);

const authSlice = createSlice({
  name: 'auth',
  initialState: ObjsHasSameStructure(userSessionSaved, initialState)
    ? userSessionSaved
    : initialState,
  reducers: {
    setAuthenticatedUser(
      _state,
      { payload }: PayloadAction<AuthState>,
    ): AuthState {
      return payload;
    },
    resetUserAuthenticated(): AuthState {
      window.localStorage.removeItem(AUTH_KEY);
      return initialState;
    },
  },
});

export const { setAuthenticatedUser, resetUserAuthenticated } =
  authSlice.actions;

export default authSlice.reducer;
