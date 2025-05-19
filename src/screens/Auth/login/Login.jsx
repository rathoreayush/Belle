import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Button from 'components/button/button';
import Style from './Style';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import {postWithoutHeader} from '../../../services/api';
import Endpoints from '../../../api/endpoints';
import ErrorScreen from '../../../components/error/Error';
import NewRegistration from '../newRegistration/NewRegistration';
import {showErrorToast} from '../../../utils/toastMessage';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../../redux/slice/authSlice';
import {saveAuthData} from '../../../utils/authHelper';

const Loader = () => <ActivityIndicator size="large" color="#EF3CA6" />;

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  /* refs for the four OTP boxes */
  const inputRefs = useMemo(
    () => Array.from({length: 4}, () => React.createRef()),
    [],
  );

  /* state */
  const [otp, setOtp] = useState(''); // keep OTP as a simple string
  const [deviceID, setDeviceID] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [mpinCreated, setMpinCreated] = useState(false);
  const [showMpin, setShowMpin] = useState(false);

  /* DEVICE ID */
  useEffect(() => {
    (async () => {
      try {
        const id = await DeviceInfo.getUniqueId();
        setDeviceID(id);
      } catch (err) {
        console.log('Error fetching device ID:', err);
      }
    })();
  }, []);

  /* CHECK MPIN EXISTS */
  const checkMPIN = useCallback(async () => {
    console.log(Endpoints.mpinExists, {
      device_id: deviceID,
    });
    if (!deviceID) return;
    setError(false);
    setLoading(true);
    try {
      const res = await postWithoutHeader(Endpoints.mpinExists, {
        device_id: deviceID,
      });
      setMpinCreated(res.mpin_status);
    } catch (err) {
      //  console.log('checkMPIN error:', err?.response?.data ?? err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [deviceID]);

  useEffect(() => {
    if (deviceID) checkMPIN();
  }, [deviceID, checkMPIN]);

  /* Login with MPIN */
  const MPINLogin = async () => {
    if (otp.length !== 4) {
      showErrorToast('Enter the 4‑digit OTP');
      return;
    }
    setLoader(true);
    try {
      const response = await postWithoutHeader(Endpoints.mpinLogin, {
        device_id: deviceID,
        mpin: otp,
      });
      if (response?.status === true) {
        Keyboard.dismiss();
        const data = {
          token: response?.token,
          user: response?.user,
          autoAuth: true,
        };
        dispatch(setCredentials(data));
        saveAuthData(data);
      } else {
        showErrorToast(response?.message);
      }
    } catch (e) {
      console.log(e);
      showErrorToast('Something went wrong');
    } finally {
      setLoader(false);
    }
  };

  /* RENDER */
  return (
    <SafeAreaView style={Style.container}>
      {/* global loader */}
      <Modal visible={isLoading} transparent animationType="fade">
        <View style={Style.modalOverlay}>
          <Loader />
          <Text style={Style.label}>Loading...</Text>
        </View>
      </Modal>

      {error ? (
        <ErrorScreen onRetry={checkMPIN} />
      ) : !mpinCreated ? (
        <NewRegistration />
      ) : (
        /* KEYBOARD‑AWARE WRAPPER */
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -10}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            {/* HEADER / LOGO */}
            <View style={Style.topSection}>
              <Image
                source={require('../../../../assets/images/belle-logo.png')}
                style={Style.logo}
                resizeMode="contain"
              />
            </View>

            {/* FORM */}
            <View style={Style.formSection}>
              <Text style={Style.text}>Enter Login MPIN</Text>

              <View style={Style.otpInputRow}>
                {Array.from({length: 4}).map((_, i) => (
                  <TextInput
                    key={i}
                    secureTextEntry={!showMpin}
                    ref={inputRefs[i]}
                    style={Style.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    /* 👇 force value to always be a string */
                    value={(otp[i] ?? '').toString()}
                    onChangeText={digit => {
                      if (!/^\d?$/.test(digit)) return;
                      const next = otp.split('');
                      next[i] = digit;
                      setOtp(next.join(''));
                      if (digit && i < 3) {
                        inputRefs[i + 1].current?.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        if (otp[i]) {
                          const next = otp.split('');
                          next[i] = '';
                          setOtp(next.join(''));
                        } else if (i > 0) {
                          inputRefs[i - 1].current?.focus();
                        }
                      }
                    }}
                  />
                ))}
              </View>

              <View style={Style.showContainer}>
                <TouchableOpacity onPress={() => setShowMpin(prev => !prev)}>
                  <Text style={Style.text}>
                    {showMpin ? 'Hide MPIN' : 'Show MPIN'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={Style.buttonContainer}>
                {loader ? (
                  <Loader />
                ) : (
                  <Button label="Login" onPress={MPINLogin} />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
