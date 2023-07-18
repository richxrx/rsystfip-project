import api from "./api.service";

export const getDocuments = async () => {
  const { data } = await api("/documents");
  return data;
};
