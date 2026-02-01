import { API } from "../endpoints";
import axios from "../axios";

export const createUser = async (userData: any) => {
    try {
        const response = await axios.post(
            API.ADMIN.USER.CREATE,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // for file upload/multer
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Create user failed');
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(API.ADMIN.USER.GET_ALL);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get all users failed');
    }
}

export const getUserById = async (userId: string) => {
    try {
        const response = await axios.get(`${API.ADMIN.USER.GET_BY_ID}/${userId}`);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Get user failed');
    }
}

export const updateUser = async (userId: string, userData: any) => {
    try {
        const response = await axios.put(
            `${API.ADMIN.USER.UPDATE}/${userId}`,
            userData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // for file upload/multer
                }
            }
        );
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Update user failed');
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const response = await axios.delete(`${API.ADMIN.USER.DELETE}/${userId}`);
        return response.data;
    } catch (error: Error | any) {
        throw new Error(error.response?.data?.message
            || error.message || 'Delete user failed');
    }
}