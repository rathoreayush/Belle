import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveAuthData = async data => {
  try {
    await AsyncStorage.setItem('authData', JSON.stringify(data));
  } catch (error) {
    console.error('Saving auth error', error);
  }
};

export const getAuthData = async () => {
  try {
    const json = await AsyncStorage.getItem('authData');
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Getting auth error', error);
    return null;
  }
};

export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem('authData');
  } catch (error) {
    console.error('Clearing auth error', error);
  }
};
