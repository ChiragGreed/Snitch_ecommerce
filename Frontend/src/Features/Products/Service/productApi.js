import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6060/api/products',
  withCredentials: true,
});

export const createProductApi = async (formData) => {
  const response = await api.post('/create', formData);
  return response.data;
}

export const getSellerProductsApi = async () => {
  const response = await api.get('/seller');
  return response.data;
}

export const getProductsApi = async () => {
  const response = await api.get('/');
  return response.data;
}

export const getProductApi = async ({ productId }) => {
  const response = await api.get(`/${productId}`);
  return response.data;
}
