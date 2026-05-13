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
  return response.data;
}

export const addItemQuantityApi = async (itemId) => {
  const response = await api.post('/addItemQuantity', { itemId });
}


export const subItemQuantityApi = async (itemId) => {
  const response = await api.post('/subItemQuantity', { itemId });
}

