import api from './api.service';

export const getCategories = async () => {
  const { data } = await api('/categories');
  return data;
};
