import axios from 'axios';
import {BASE_URL} from '@env'; // From .env using react-native-dotenv
import {Alert} from 'react-native';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👉 Request Interceptor (Optional: Add token here globally)
instance.interceptors.request.use(
  async config => {
    // You can inject token here globally if needed
    return config;
  },
  error => Promise.reject(error),
);

// 👉 Response Interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    console.log('API Error: ', error?.response || error.message);
    Alert.alert(
      'Error',
      error?.response?.data?.message || 'Something went wrong!',
    );
    return Promise.reject(error);
  },
);

export const postWithoutHeader = async (url, data) => {
  const response = await instance.post(url, data);
  return response.data;
};

export const postWithHeader = async (url, data, token) => {
  const response = await instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getWithHeader = async (url, token) => {
  const response = await instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getWithoutHeader = async url => {
  const response = await instance.get(url);
  return response.data;
};
