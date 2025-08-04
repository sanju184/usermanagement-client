import axios from "axios";

const api = axios.create({ baseURL: "https://usermanagement-backend-1-w59j.onrender.com/api" });

export const login = (email, password) =>
  api.post("/auth/login", { email, password });
export const register = (email, password, name) =>
  api.post("/auth/register", { email, password, name });

export  const addUser = (formData)=>{
   return api.post('/employees', formData);
}

export  const getUser = ()=>{
   return api.get('/employees');
}

export  const updateUser = (id,data)=>{
   return api.put(`/employees/${id}`,data);
}

export  const deleteUser = (id)=>{
   return api.delete(`/employees/${id}`);
}
