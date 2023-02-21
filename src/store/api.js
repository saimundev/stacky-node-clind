import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5050/api/" });
API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
})


//AUTH API CALL
export const regusterUserData = (data) => API.post("auth/reguster", data);
export const loginUserData = (data) => API.post("auth/login", data);
export const forgetEmailSendData = (data) => API.post("auth/forget-password",data);
export const forgetPasswordData = (data, id, token) => API.put(`auth/forget-password/${id}/${token}`, data);


//NODE API CALL
export const addNodeData = (data) => API.post("node/add-node", data);
export const getNodeData = (id) => API.get(`node/get-node/${id}`);
export const deleteNodeData = (id) => API.delete(`node/delete-node/${id}`);
export const editNodeData = (id, data) => API.put(`node/update-node/${id}`, data);


//USER API CALL
export const updateData = (id, data) => API.put(`profile/update-profile/${id}`, data);
export const getProfile = (id) => API.get(`profile/get-profile/${id}`);