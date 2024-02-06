import type { AuthState } from "../features/auth/authSlice";
import api from ".";

export const verifySession = async ({ token }: AuthState) =>
  await api.post("/session/verify-jwt-of-session", { token });
