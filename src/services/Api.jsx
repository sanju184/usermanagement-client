import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:5000/api' });

export const login = (email,password)=>api.post('/auth/login',{email,password});
export const register = (email,password,name) => api.post('/auth/register',{email, password,name});

