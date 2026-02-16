import axios from '../axios'
import { API } from '../endpoints'

export interface OrderItem {
    plantId: {
        _id: string, 
        name: string, 
        plantImage?: string[];
        image?:string; 
    };
    quantity: number; 
    price: number;
}

export interface Order {
    _id: string; 
    userId: {
        _id: string; 
        firstName: string; 
        lastName: string; 
        email: string; 
    };
    items: OrderItem[]; 
    totalAmount: number; 
    createdAt: string; 
    updatedAt: string; 
}

export const getAllOrders = async()=>{
    try {
        const response = await axios.get(API.ADMIN.ORDER.GET_ALL);
        return response.data; 
    }catch(error: Error | any){
        throw new Error(error.response?.data?.message || error.message || 'Get all orders failed');
    }
};

export const getOrderById = async(orderId: string) =>{
    try {
        const response = await axios.get(API.ADMIN.ORDER.GET_ONE(orderId));
        return response.data;
    }catch (error: Error | any){
        throw new Error(error.response?.data?.message || error.message || 'Get Order failed');
    }
};