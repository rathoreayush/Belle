import React, {useState, useCallback, useMemo, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import LOGO from 'assets/images/belle-logo.png';
import Style from './Style';
import CustomTextInput from 'components/textInput/textInput';
import Button from 'components/button/button';
import BackButton from 'components/backButton/backButton';
import {useNavigation} from '@react-navigation/native';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import {showErrorToast, showSuccessToast} from '../../../utils/toastMessage';
import {useDispatch} from 'react-redux';
import {setCredentials} from '../../../redux/slice/authSlice';
import {saveAuthData} from '../../../utils/authHelper';

const NewRegistration = ({role}) => {
  console.log('role', role);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  /* ───── one‑time refs array ─────────────── */
  const inputRefs = useMemo(
    () => Array.from({length: 4}, () => React.createRef()),
    [],
  );

  /* ───── state ─────────────────────────────────── */
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(''); // 4‑digit string
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [Loader, setLoader] = useState(false);

  /* ───── helpers ───────────────────────────────── */
  const isValidMobile = mobile.length === 10;

  const otpRequest = useCallback(async () => {
    if (!isValidMobile) {
      showErrorToast('Enter a valid 10‑digit mobile number');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);

    try {
      const res = await postWithHeader(Endpoint.otp, {phone: mobile});
      console.log(res);
      if (res.status === true) {
        showSuccessToast(res.message);
        setOtpSent(true);
      } else {
        showErrorToast(res.message);
      }
    } catch (err) {
      //console.error(err);
      showErrorToast('Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  }, [mobile, isValidMobile]);

  /* ─── verify OTP ─────────────────────────────── */
  const verifyOtp = useCallback(async () => {
    if (otp.length !== 4) {
      showErrorToast('Enter the 4‑digit OTP');
      return;
    }

    setLoader(true);
    try {
      const res = await postWithHeader(Endpoint.otpVerify, {
        phone: mobile,
        otp,
      });

      if (res?.status === true) {
        Keyboard.dismiss();
        // showSuccessToast(res.message || 'OTP verified');
        const data = {token: res?.token, user: res?.user, autoAuth: false};
        dispatch(setCredentials(data));
        saveAuthData(data);
        navigation.reset({
          index: 0,
          routes: [{name: 'MPIN'}],
        });
      } else {
        showErrorToast(res?.message || 'Invalid OTP');
      }
    } catch (err) {
      showErrorToast('Something went wrong. Please try again');
    } finally {
      setLoader(false);
    }
  }, [mobile, otp]);

  /* ───── UI ────────────────────────────────────── */
  return (
    <SafeAreaView style={Style.screenContainer}>
      <View style={Style.topCurve}>
        <View style={Style.logoContainer}>
          <Image source={LOGO} style={Style.logo} resizeMode="contain" />
        </View>
      </View>

      <View style={Style.formSection}>
        {otpSent ? (
          /* ─── OTP input ────────────────────────── */
          <>
            <View style={Style.inputContainer}>
              <Text style={Style.text}>Enter OTP</Text>

              <View style={Style.otpInputRow}>
                {Array.from({length: 4}).map((_, i) => (
                  <TextInput
                    key={i}
                    ref={inputRefs[i]}
                    style={Style.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={otp[i] ?? ''}
                    onChangeText={digit => {
                      if (!/^\d?$/.test(digit)) return;

                      const next = otp.split('');
                      next[i] = digit;
                      setOtp(next.join(''));

                      // Move to next input
                      if (digit && i < 3) {
                        inputRefs[i + 1].current?.focus();
                      }
                    }}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        if (otp[i]) {
                          // Clear current digit
                          const next = otp.split('');
                          next[i] = '';
                          setOtp(next.join(''));
                        } else if (i > 0) {
                          // Move back
                          inputRefs[i - 1].current?.focus();
                        }
                      }
                    }}
                  />
                ))}
              </View>

              <View style={Style.resendContainer}>
                <Text style={Style.resendText}>Didn't receive a code? </Text>
                <TouchableOpacity disabled={isLoading} onPress={otpRequest}>
                  <Text style={Style.text}>
                    {isLoading ? 'wait...' : 'Resend'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={Style.buttonContainer}>
              <Button
                label={Loader ? 'Please wait…' : 'Verify'}
                onPress={verifyOtp}
                disabled={isLoading}
              />
            </View>
          </>
        ) : (
          /* ─── Mobile input ─────────────────────── */
          <>
            <View style={Style.inputContainer}>
              <Text style={Style.text}>Mobile Number</Text>

              <CustomTextInput
                placeholder="Enter your mobile number"
                keyboardType="numeric"
                maxLength={10}
                value={mobile}
                onChangeText={t => setMobile(t.replace(/[^0-9]/g, ''))}
              />
            </View>

            <View style={Style.buttonContainer}>
              <Button
                label={isLoading ? 'Sending…' : 'GET OTP'}
                onPress={otpRequest}
                disabled={!isValidMobile || isLoading}
              />
            </View>
            {role === 4 ? (
              <>
                <View style={Style.orContainer}>
                  <Text style={Style.orText}>Or,</Text>
                </View>
                <View style={Style.buttonContainer}>
                  <Button
                    label="Register Now"
                    onPress={() => navigation.navigate('Registration')}
                  />
                </View>
              </>
            ) : null}
          </>
        )}

        <View style={Style.backButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewRegistration;
