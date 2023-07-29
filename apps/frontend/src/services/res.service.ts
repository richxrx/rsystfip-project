import axios from "axios";

export const getPngbase64 = async () => {
  const { data } = await axios("/img/admin.png", {
    responseType: "blob",
  });
  return data;
};
