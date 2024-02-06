import api from ".";

export const auth = async (body: any) => await api.post("/auth", body);
