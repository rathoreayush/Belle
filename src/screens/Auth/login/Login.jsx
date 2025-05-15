// screens/LoginScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomTextInput from 'components/textInput/textInput';
import Button from 'components/button/button';
import Style from './Style';
import {useNavigation} from '@react-navigation/native';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={Style.container}>
      <ScrollView>
        <View style={Style.topSection}>
          <Image
            source={require('../../../../assets/images/belle-logo.png')}
            style={Style.logo}
          />
        </View>

        <View style={Style.formSection}>
          <View style={Style.inputContainer}>
            <CustomTextInput
              placeholder="Email or Phone"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
            />
          </View>
          <View style={Style.inputContainer}>
            <CustomTextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={Style.buttonContainer}>
            <Button label="Login" onPress={() => {}} />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={Style.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={Style.orText}>or</Text>

          <TouchableOpacity
            style={Style.createButton}
            onPress={() => navigation.navigate('Registration')}>
            <Text style={Style.createText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
