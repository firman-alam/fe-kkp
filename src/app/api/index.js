import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const API = axios.create({
  baseURL: BASE_URL,
});

// income API
export const getIncome = async () => {
  const response = await API.get('/income');

  return response.data;
};
export const getTotalIncome = async () => {
  const response = await API.get('/income/total');

  return response.data;
};
export const getTransferIncome = async () => {
  const response = await API.get('/income/transfer');

  return response.data;
};
export const createIncome = async (data) => {
  const response = await API.post('/income', data);

  return response.data;
};
export const updateIncome = async (data) => {
  return await API.patch(`/income`, data);
};
export const deleteIncome = async (id) => {
  return await API.delete(`/income/${id}`, id);
};

// outcome API
export const getOutcome = async () => {
  const response = await API.get('/outcome');

  return response.data;
};
export const getTotalOutcome = async () => {
  const response = await API.get('/outcome/total');

  return response.data;
};
export const createOutcome = async (data) => {
  const response = await API.post('/outcome', data);

  return response.data;
};
export const updateOutcome = async (data) => {
  return await API.patch(`/outcome`, data);
};
export const deleteOutcome = async (id) => {
  return await API.delete(`/outcome/${id}`, id);
};

// category API
export const getKas = async () => {
  const response = await API.get('/category/kas');

  return response.data;
};
export const getKajian = async () => {
  const response = await API.get('/category/kajian');

  return response.data;
};
export const getQurban = async () => {
  const response = await API.get('/category/qurban');

  return response.data;
};
export const getZakat = async () => {
  const response = await API.get('/category/zakat');

  return response.data;
};
export const getDauroh = async () => {
  const response = await API.get('/category/dauroh');

  return response.data;
};
