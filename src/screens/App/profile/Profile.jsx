import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import Style from './Style';
import CustomHeader from '../../../components/customHeader/customHeader';
import UserLogo from 'assets/images/user.png';
import CustomTextInput from '../../../components/textInput/textInput';
import Button from '../../../components/button/button';

const Profile = () => {
  return (
    <SafeAreaView style={Style.screenContainer}>
      <CustomHeader label="Profile Settings" />
      <View style={Style.formContainer}>
        <View style={Style.userContainer}>
          <Image source={UserLogo} style={Style.logo} />
        </View>
        <View style={Style.inputContainer}>
          <CustomTextInput placeholder="Full Name" />
        </View>
        <View style={Style.inputContainer}>
          <CustomTextInput placeholder="Date of Birth" />
        </View>
        <View style={Style.inputContainer}>
          <CustomTextInput placeholder="Phone Number" keyboardType="numeric" />
        </View>
        <View style={Style.inputContainer}>
          <CustomTextInput placeholder="Email" />
        </View>
        <View style={Style.inputContainer}>
          <CustomTextInput placeholder="Gender" />
        </View>
        <View style={{marginTop: 30}}>
          <Button label="Submit" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
