import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://192.168.100.13:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAction = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || 'Login gagal');
    }

  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || error.message || 'Terjadi kesalahan saat login'
    );
  }
};

export const getUserProfile = async () => {
  const res = await api.get('/me');
  return res.data.data;
};

export default api;
