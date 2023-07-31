import api from './api.service';

export const sendEmail = async (sgPayload: any) => {
  const { data } = await api.post('/sendgrid', sgPayload);
  return data;
};
