import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import LOGO from 'assets/images/belle-logo.png';
import Style from './Style';
import CustomTextInput from 'components/textInput/textInput';
import Button from 'components/button/button';
import BackButton from 'components/backButton/backButton';
import {useNavigation} from '@react-navigation/native';
const ForgotPassword = () => {
  const navigation = useNavigation();
  const [otpSend, setOtpSend] = useState(false);
  const [otp, setOtp] = useState(Array(4).fill(''));
  return (
    <SafeAreaView style={Style.screenContainer}>
      <View style={Style.topCurve}>
        <View style={Style.logoContainer}>
          <Image source={LOGO} style={Style.logo} resizeMode="contain" />
        </View>
      </View>
      <View style={Style.formSection}>
        {otpSend ? (
          <>
            <View style={Style.inputContainer}>
              <View style={Style.textContainer}>
                <Text style={Style.text}>Enter OTP</Text>
              </View>
              {/* OTP Input Fields */}
              <View style={Style.otpInputRow}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    // ref={el => (inputRefs.current[index] = el)}
                    style={Style.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    // secureTextEntry={isSecure}
                    // value={digit}
                    // onChangeText={text => handleInputChange(text, index)}
                  />
                ))}
              </View>
              <View style={Style.resendContainer}>
                <Text style={Style.resendText}>Didn't recieve a code ? </Text>
                <TouchableOpacity>
                  <Text style={Style.text}>Resend new code</Text>
                </TouchableOpacity>
              </View>
              {/* <CustomTextInput
                placeholder="Enter Your Mobile Number"
                keyboardType="numeric"
                maxLength={10}
              /> */}
            </View>
            <View style={Style.buttonContainer}>
              <Button label="Verify" onPress={() => setOtpSend(false)} />
            </View>
          </>
        ) : (
          <>
            <View style={Style.inputContainer}>
              <View style={Style.textContainer}>
                <Text style={Style.text}>Mobile Number</Text>
              </View>
              <CustomTextInput
                placeholder="Enter Your Mobile Number"
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={Style.buttonContainer}>
              <Button label="GET OTP" onPress={() => setOtpSend(true)} />
            </View>
          </>
        )}

        <View style={Style.backButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
