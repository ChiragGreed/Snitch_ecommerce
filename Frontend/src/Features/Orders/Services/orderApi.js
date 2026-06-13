import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6060/api/order',
    withCredentials: true,
});

export const createOrderApi = async (cartId) => {
    const response = await api.post('/createOrder', { cartId });
    return response.data;
}