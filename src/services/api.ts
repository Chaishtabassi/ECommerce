// src/services/api.ts
import axios from 'axios';
import { Product } from '../types/navigation';

const API_BASE_URL = 'https://fakestoreapi.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout. Please check your internet connection.');
      }
      if (error.response) {
        throw new Error(`Server error: ${error.response.status}`);
      }
      if (error.request) {
        throw new Error('No response from server. Please check your internet connection.');
      }
    }
    throw new Error('Failed to fetch products. Please try again.');
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error('Product not found.');
      }
      throw new Error('Failed to fetch product details.');
    }
    throw new Error('An unexpected error occurred.');
  }
};