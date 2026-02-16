"use server"

import { getAllOrders, getOrderById } from "@/lib/api/admin/order"

export const handleGetAllOrders = async () =>{
    try {
        const response = await getAllOrders();
        if(response.success){
            return {
                success: true, 
                message: 'Get all orders successful', 
                data: response.data
            };
        }
        return {
            success: false, 
            message: response.message || 'Get all orders failed'
        };
    }catch(error: Error | any){
        return {
            success: false,
            message: error.message || 'Get all orders action failed'
        };
    }
};

export const handleOrderById = async(orderId: string) =>{
    try {
        const response = await getOrderById(orderId);
        if (response.success){
            return {
                success: true, 
                message: 'Get Order Successful', 
                data: response.data
            };
        }return {
            success: false, 
            message: response.message || 'Get order failed'
        };
    }catch (error: Error | any){
        return {
            success: false, 
            message: error.message || 'Get order action failed'
        };
    }
};