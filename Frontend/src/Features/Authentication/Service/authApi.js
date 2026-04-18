import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:6060/api/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const registerApi = async ({ fullname, email, contact, password }) => {
    const response = await api.post('/register', { fullname, email, contact, password });
    return response.data;
}

export const loginApi = async ({ email, password }) => {
    const response = await api.post('/login', { email, password });

    return response.data;
}

export const getMeApi = async () => {
    const response = await api.get('/getMe');
    return response.data;
}

export const protectedRouteApi = async () => {
    const response = await api.get('/protectedRoute');
    return response.data;
}