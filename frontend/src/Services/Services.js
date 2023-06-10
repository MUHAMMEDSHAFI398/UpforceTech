import axios from "../axios";

export const registrationAPI = (data,headers) => {
    return axios.post('/register', data,headers)
}

export const getUsersAPI = () => {
    return axios.get('/users')
}

export const statusChangeAPI = (data) => {
    return axios.patch('/edit-status',data)
}

export const editUserWithProfileAPI = (id,data,headers) => {
    return axios.patch(`/edit-profile/${id}`,data,headers)
}

export const edituserAPI = (id,data) => {
    return axios.patch(`/edituser/${id}`,data)
}
export const deleteUserAPI = (data) => {
    return axios.patch('/delete',data)
}