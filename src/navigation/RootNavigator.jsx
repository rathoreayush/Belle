import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthData} from '../utils/authHelper';
import {setCredentials, setLoading} from '../redux/slice/authSlice';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function RootNavigator() {
  const dispatch = useDispatch();
  const {isAuthenticated, isLoading} = useSelector(state => state.auth);

  useEffect(() => {
    const initAuth = async () => {
      const stored = await getAuthData(); // {token,user} | null
      if (stored?.token) {
        // we keep token & user in Redux, BUT leave isAuthenticated = false
        dispatch(
          setCredentials({
            token: stored.token,
            user: stored.user,
            autoAuth: true,
            // slice’s reducer sets isAuthenticated = true;
            // If you want it FALSE until MPIN, adjust the reducer or create a separate action.
          }),
        );
      } else {
        dispatch(setLoading(false));
      }
    };
    initAuth();
  }, [dispatch]);

  // useEffect(() => {
  //   const loadStoredData = async () => {
  //     const authData = await getAuthData();
  //     if (authData?.token) {
  //       dispatch(setCredentials(authData));
  //     } else {
  //       dispatch(setLoading(false));
  //     }
  //   };
  //   loadStoredData();
  // }, []);

  if (isLoading) return null; // Splash screen or loader
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
