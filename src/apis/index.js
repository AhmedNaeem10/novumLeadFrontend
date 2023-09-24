import axios from 'axios';
import { API_CONSTANT } from '../constants/ApiConstants';

// const base_url = "http://localhost:4000/"
const base_url = "http://52.66.203.161:4000/"

export const login = async (username, password) => {
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

export const updateBooking = async (id, payload) => {
    const response = await axios.put(`${base_url}${API_CONSTANT.UPDATE_BOOKING}${id}`, payload);
    return response.data;
}

export const getBookings = async (id, filter = null) => {
    const response = await axios.get(`${base_url}${API_CONSTANT.GET_BOOKINGS}${id}`);
    let result = response.data.data || [];
    if (filter) {
        result = result.filter(x => x.bookingStatus == filter)
    }
    return result;
}

export const getProjects = async (id) => {
    const response = await axios.get(`${base_url}${API_CONSTANT.GET_PROJECTS}${id}`);
    return response.data.data;
}

