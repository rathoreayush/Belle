import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  forwardRef,
} from 'react';
import {SafeAreaView, View, Image, Text, TextInput} from 'react-native';
import Style from './Style';
import LOGO from 'assets/images/belle-logo.png';
import Button from 'components/button/button';
import BackButton from 'components/backButton/backButton';
import {postWithHeader, postWithoutHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import {showErrorToast, showSuccessToast} from '../../../utils/toastMessage';
import DeviceInfo from 'react-native-device-info';
import {setAuthenticated} from '../../../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
const DIGITS = 4;

/* ────────── reusable 1‑digit input ────────── */
const DigitInput = forwardRef(({value, onChange, onBackspace}, ref) => (
  <TextInput
    ref={ref}
    style={Style.otpInput}
    maxLength={1}
    keyboardType="numeric"
    value={value}
    onChangeText={txt => {
      if (/^\d?$/.test(txt)) onChange(txt); // allow a single digit or empty
    }}
    onKeyPress={({nativeEvent}) => {
      if (nativeEvent.key === 'Backspace') onBackspace();
    }}
  />
));

const MPIN = () => {
  const dispatch = useDispatch();
  /* refs for the four inputs */
  const inputRefs = useMemo(
    () => Array.from({length: DIGITS}, () => React.createRef()),
    [],
  );

  /* state */
  const [mpin, setMPIN] = useState(Array(DIGITS).fill(''));
  const [confirm, setConfirm] = useState(Array(DIGITS).fill(''));
  const [step, setStep] = useState('create'); // 'create' | 'confirm'
  const [deviceID, setDeviceID] = useState(null);
  const [loading, setLoading] = useState(false);

  /* get device id once */
  useEffect(() => {
    DeviceInfo.getUniqueId().then(setDeviceID).catch(console.log);
  }, []);

  /* helpers */
  const focus = idx => inputRefs[idx]?.current?.focus?.();

  const handleDigit = (arr, setArr, idx, digit) => {
    const next = [...arr];
    next[idx] = digit;
    setArr(next);
    if (digit && idx < DIGITS - 1) focus(idx + 1);
  };

  const handleBackspace = (arr, setArr, idx) => {
    const next = [...arr];
    if (next[idx]) {
      next[idx] = '';
      setArr(next);
    } else if (idx > 0) {
      focus(idx - 1);
    }
  };

  /* auto‑advance to confirm screen after first 4 digits */
  useEffect(() => {
    if (step === 'create' && mpin.every(Boolean)) {
      setStep('confirm');
      focus(0);
    }
  }, [mpin, step]);

  /* submit final MPIN */
  const submit = useCallback(async () => {
    if (!deviceID) return;
    if (!confirm.every(Boolean)) {
      showErrorToast('Please enter the 4‑digit MPIN again');
      return;
    }
    if (mpin.join('') !== confirm.join('')) {
      showErrorToast('MPINs do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await postWithHeader(Endpoint.mpinCreate, {
        device_id: deviceID,
        mpin: mpin.join(''),
      });

      if (res?.status === true) {
        // reset form for next time
        // setMPIN(Array(DIGITS).fill(''));
        // setConfirm(Array(DIGITS).fill(''));
        // setStep('create');
        // focus(0);
        //  const data = {
        //           token: response?.token,
        //           user: response?.user,
        //           autoAuth: true,
        //         };
        //         dispatch(setCredentials(data));
        dispatch(setAuthenticated(true));
      } else {
        showErrorToast(res?.message || 'Failed');
      }
    } catch {
      showErrorToast('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [deviceID, mpin, confirm]);

  /* which array are we rendering? */
  const digits = step === 'create' ? mpin : confirm;
  const setDigits = step === 'create' ? setMPIN : setConfirm;

  return (
    <SafeAreaView style={Style.screenContainer}>
      {/* ────── header logo ────── */}
      <View style={Style.topCurve}>
        <View style={Style.logoContainer}>
          <Image source={LOGO} style={Style.logo} resizeMode="contain" />
        </View>
      </View>

      {/* ────── form ────── */}
      <View style={Style.formSection}>
        <View style={Style.inputContainer}>
          <Text style={Style.text}>
            {step === 'create' ? 'Enter MPIN' : 'Confirm MPIN'}
          </Text>

          <View style={Style.otpInputRow}>
            {digits.map((d, i) => (
              <DigitInput
                /* eslint-disable-next-line react/no-array-index-key */
                key={i}
                ref={inputRefs[i]}
                value={d}
                onChange={txt => handleDigit(digits, setDigits, i, txt)}
                onBackspace={() => handleBackspace(digits, setDigits, i)}
              />
            ))}
          </View>
        </View>

        {step === 'confirm' && (
          <View style={Style.buttonContainer}>
            <Button
              label={loading ? 'Please wait…' : 'Create MPIN'}
              onPress={submit}
              disabled={loading}
            />
          </View>
        )}

        <View style={Style.backButton}>
          <BackButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MPIN;
