import {API} from './endpoints';
import axios from 'axios';


export const getAllPlants = async (page: number = 1, size: number = 12, search?: string) =>{
    try{
        const response = await axios.get(API.PUBLIC.PLANT.GET_ALL, {
            params: {page, size, search}
        });
        return response.data; 
    } catch (error: any){
        throw new Error (
            error.response?.data?.message ||
            error.message ||
            'Failed to fetch plants'
        );
    }
};

export const getPlantDetails = async (id: string) => {
    try {
        const response = await axios.get(API.PUBLIC.PLANT.GET_ONE(id));
        return response.data; 
    } catch (error: any){
        throw new Error (
            error.message?.data?.message ||
            error.message ||
            'Failed to fetch plant details'
        );
    }
};


