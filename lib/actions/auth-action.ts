"use client"


import { register, login } from "../api/auth"
import { API } from "../api/endpoints"
import { getAuthToken } from "../cookie"
import axios from "../api/axios"
import { LoginData, RegisterData } from "@/app/(auth)/schema";
import { setAuthToken , setUserData, clearAuthCookies } from "../cookie";
import {redirect} from "next/navigation";

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
            await setUserData(result.data);
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