import axios from "./axios";
import {API} from "./endpoints";
import { getAuthToken } from "../cookie";

export const updateProfile = async (formData: FormData) => {
    try {
        const token = await getAuthToken();
        
        const response = await axios.put(
            API.AUTH.UPDATE_PROFILE, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
                // Remove withCredentials to avoid CORS issues
            }
        );
        return response.data; 
    } catch (err: Error | any) {
        throw new Error (
            err.response?.data?.message
            || err.message
            || 'Profile update failed'
        );
    }
};
