"use client"


import { register, login } from "../api/auth"
import { API } from "../api/endpoints"
import { getAuthToken } from "../cookie"
import axios from "../api/axios"
import { LoginData, RegisterData } from "@/app/(auth)/schema";
import { setAuthToken , setUserData, clearAuthCookies } from "../cookie";
import {redirect} from "next/navigation";
import { set } from "zod";

const updateProfile = async (formData: FormData) => {
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

export const handleRegister = async (formData : RegisterData) =>{


    try {
        const result = await register(formData);

            if(result.success){
                return {
                    success : true, 
                    message : 'Registration Successful',
                    data : result.data
                };
            }

            return {
                success : false, 
                message : result.message || "Registration Failed"
            }
    }catch (err: Error | any){
        return {
            success: false, message : err.message || "Registration Failed "
        }
    }
}




export const handleLogin = async (formData : any) =>{


    try {
        const result = await login(formData);

            if(result.success){
                await setAuthToken(result.token);
                await setUserData(result.data);
                return {
                    success : true, 
                    message : 'Login Successful',
                    data : result.data
                };
            }

            return {
                success : false, 
                message : result.message || "Login Failed"
            }
    }catch (err: Error | any){
        return {
            success: false, message : err.message || "Login Failed "
        }
    }
}

export const handleLogout = async () => {
    await clearAuthCookies();
    return redirect('/login');
}

export const handleUpdateProfile = async (formData: FormData) => {
    try {
        const result = await updateProfile(formData);
        
        if(result.success){
            return {
                success: true,
                message: 'Profile update successful',
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || "Profile update failed"
        }
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Profile update failed"
        }
    }
}

export const handleUpdateUserProfile = async (formData: FormData) => {
    try {
        const result = await updateProfile(formData);
        
        if(result.success){
            return {
                success: true,
                message: 'Profile update successful',
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || "Profile update failed"
        }
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || "Profile update failed"
        }
    }
}

const updateAnyProfile = async (formData: FormData, userType: string = 'user') => {
    try {
        const token = await getAuthToken();
        
        let endpoint = API.AUTH.UPDATE_PROFILE;
        // For now, use the same endpoint for all user types
        // In the future, you can add specific endpoints like:
        // if (userType === 'admin') {
        //     endpoint = "/api/auth/admin/profile";
        // } else if (userType === 'doctor') {
        //     endpoint = "/api/auth/doctor/profile";
        // }
        
        const response = await axios.put(
            endpoint, 
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
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

export const handleUpdateAnyUserProfile = async (formData: FormData, userType: string = 'user') => {
    try {
        const result = await updateAnyProfile(formData, userType);
        
        if(result.success){
            return {
                success: true,
                message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} profile update successful`,
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || `${userType} profile update failed`
        }
    } catch (err: Error | any) {
        return {
            success: false,
            message: err.message || `${userType} profile update failed`
        }
    }
}