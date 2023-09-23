import axios from 'axios';
import { API_CONSTANT } from '../constants/ApiConstants';

const base_url = "http://localhost:4000/"

export const login = async (username, password) => {
    // return {username: "admin", token: "SOME_TOKEN"}
    const response = await axios.post(base_url + API_CONSTANT.LOGIN, { username, password })
    return response.data.data;
}

export const getAppointments = async (param = null) => {
    let endpoint = base_url + API_CONSTANT.GET_APPOINTMENTS
    if (param) {
        endpoint += `/${param}`
    }
    const response = await axios.get(endpoint);
    return response.data.data;
}

export const getUsers = async (token) => {
    const response = await axios.get(base_url + API_CONSTANT.GET_USERS, { headers: { 'x-access-token': token } });
    return response.data.data;
}

export const updateBooking = async (id, payload) => {
    const response = await axios.put(`${base_url}${API_CONSTANT.UPDATE_BOOKING}${id}`, payload);
    console.log(response.data);
    return response.data;
}

export const getLeadPainters = async () => {
    const response = await axios.get(base_url + API_CONSTANT.GET_LEADPAINTERS);
    return response.data.data;
}