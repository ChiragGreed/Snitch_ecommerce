import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6060/api/cart',
  withCredentials: true,
});

export const addItemToCartApi = async (productId, variantId) => {
  const response = await api.post(`/add/${productId}/${variantId}`, { quantity: 1 });
  return response.data;
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

export const removeItemApi = async (itemId) => {
  const response = await api.post('/removeItem', { itemId });
}

export const createPaymentOrderApi = async (amount, currency) => {
  const response = await api.post('/order/payment', { amount, currency });
  return response.data;
} 
