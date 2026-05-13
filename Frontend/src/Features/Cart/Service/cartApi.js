import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6060/api/cart',
  withCredentials: true,
});

export const addItemToCartApi = async (productId, variantId) => {
  await api.post(`/add/${productId}/${variantId}`, { quantity: 1 });
}

export const getCartItemsAPi = async () => {

  const response = await api.get('/items');
  console.log(response.data);
  return response.data;
}


