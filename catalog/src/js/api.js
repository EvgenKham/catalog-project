// import { axios } from '../../node_modules/axios/dist/axios.js';

// Базовый URL вашего MockAPI
const PERONAL_KEY = '687f44aeefe65e5200890472';
const API_BASE_URL = `https://${PERONAL_KEY}.mockapi.io/api/v1/paints`;

// Функция для получения всех красок
export const getAllPaints = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching paints:', error);
    throw error;
  }
};

// Функция для получения краски по ID
export const getPaintById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching paint with ID ${id}:`, error);
    throw error;
  }
};

// Функция для создания новой краски
export const createPaint = async (paintData) => {
  try {
    const response = await axios.post(API_BASE_URL, paintData);
    return response.data;
  } catch (error) {
    console.error('Error creating paint:', error);
    throw error;
  }
};

// Функция для обновления краски
export const updatePaint = async (id, paintData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, paintData);
    return response.data;
  } catch (error) {
    console.error(`Error updating paint with ID ${id}:`, error);
    throw error;
  }
};

// Функция для удаления краски
export const deletePaint = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting paint with ID ${id}:`, error);
    throw error;
  }
};
