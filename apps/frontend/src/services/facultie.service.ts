import api from './api.service';

export const getFaculties = async () => {
  const { data } = await api('/faculties');
  return data;
};
