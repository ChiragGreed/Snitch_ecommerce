import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6060/api/product',
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
