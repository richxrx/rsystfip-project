import api from "./api.service";

export const createCancellation = async (cancellationData: any) => {
  const { data } = await api.post("/cancellation", cancellationData);
  return data;
};
