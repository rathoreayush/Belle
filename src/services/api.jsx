import axios from 'axios';
import {BASE_URL} from '@env'; // From .env using react-native-dotenv
import {Alert} from 'react-native';
import {store} from '../redux/store/store';
import {logout} from '../redux/slice/authSlice';
import {clearAuthData} from '../utils/authHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👉 Request Interceptor (Optional: Add token here globally)
// instance.interceptors.request.use(
//   async config => {
//     // You can inject token here globally if needed
//     return config;
//   },
//   error => Promise.reject(error),
// );

// 👉 Response Interceptor with Auto Logout
// instance.interceptors.response.use(
//   response => response,
//   async error => {
//     console.log('API Error: ', error?.response || error.message);

//     const status = error?.response?.status;
//     const message = error?.response?.data?.message || 'Something went wrong!';

//     // Auto Logout on 401 or 403 (Token expired or unauthorized)
//     if (status === 401 || status === 403) {
//       await clearAuthData();
//       store.dispatch(logout());
//       Alert.alert(
//         'Session Expired',
//         'Your session has expired. Please log in again.',
//       );
//     } else {
//       Alert.alert('Error', message);
//     }

//     return Promise.reject(error);
//   },
// );

export const postWithoutHeader = async (url, data) => {
  const response = await instance.post(url, data);
  return response.data;
};

export const postWithHeader = async (url, data) => {
  let token = store.getState()?.auth?.token;
  const response = await instance.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getWithHeader = async url => {
  let token = store.getState()?.auth?.token;
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
