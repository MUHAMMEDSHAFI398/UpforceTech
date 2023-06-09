import axios from "../axios";

export const registrationAPI = (data,headers) => {
    console.log("afhd");
    return axios.post('/register', data,headers)
}

export const getUsersAPI = () => {
    return axios.get('/users')
}