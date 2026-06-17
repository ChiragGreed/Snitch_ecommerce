import axios from 'axios';

const api = axios.create({
    baseURL: 'https://snitch-ecommerce.onrender.com/api/order',
    withCredentials: true,
});

export const createOrderApi = async (cartId) => {
    const response = await api.post('/createOrder', { cartId });
    return response.data;
}

export const getOrderApi = async () => {
    const response = await api.post(`/getOrder`);
    return response.data;
}