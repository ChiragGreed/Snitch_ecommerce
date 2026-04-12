import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:6060/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
})

export const registerApi = async ({ fullname, email, contact, password }) => {
    const response = await api.post('/register',{ fullname, email, contact, password });
    console.log(response);
    return response.data;
}