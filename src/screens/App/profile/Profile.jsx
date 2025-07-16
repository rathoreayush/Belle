import {View, Text, SafeAreaView, Image, Keyboard, Alert} from 'react-native';
import React, {useState} from 'react';
import Style from './Style';
import CustomHeader from '../../../components/customHeader/customHeader';
import UserLogo from 'assets/images/user.png';
import CustomTextInput from '../../../components/textInput/textInput';
import Button from '../../../components/button/button';
import Calender from '../../../components/calender/calender';
import TextArea from '../../../components/textArea/textArea';
import DropDown from '../../../components/dropdown/dropDown';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import {showErrorToast} from '../../../utils/toastMessage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loader from '../../../components/loader/loder';
const Profile = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  const [isLoading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    user_id: user?.id,
    name: null,
    email: null,
    gender: null,
    dob: null,
    address: null,
  });

  const data = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ];

  const validateFields = () => {
    const {name, email, gender, dob, address} = profileData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !gender || !dob || !address) {
      showErrorToast('All fields are mandatory');
      return false;
    }

    if (!emailRegex.test(email)) {
      showErrorToast('Invalid email format');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();

    if (!validateFields()) return;
    setLoading(true);
    try {
      const response = await postWithHeader(
        `${Endpoint.profileUpdate}`,
        profileData,
      );
      console.log(response);
      if (response?.status == true) {
        Alert.alert(
          'Success',
          `${response?.message}`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to Dashboard, clearing stack
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Dashboard'}],
                  }),
                );
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        showErrorToast(response?.message);
      }
    } catch (e) {
      showErrorToast('Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={Style.screenContainer}>
      <CustomHeader label="Profile Settings" />
      <View style={Style.formContainer}>
        <View style={Style.userContainer}>
          <Image source={UserLogo} style={Style.logo} />
        </View>
        <View style={Style.inputContainer}>
          <CustomTextInput
            placeholder="Full Name"
            value={profileData.name}
            onChangeText={text => {
              setProfileData({
                ...profileData,
                name: text,
              });
            }}
          />
        </View>
        <View style={Style.inputContainer}>
          <Calender
            placeholder="Date of Birth"
            onConfirm={date => {
              setProfileData({
                ...profileData,
                dob: date,
              });
            }}
            selectedDate={profileData.dob ? profileData.dob : 'DD/MM/YYYY'}
          />
        </View>

        <View style={Style.inputContainer}>
          <CustomTextInput
            placeholder="Email"
            value={profileData.email}
            onChangeText={text => {
              setProfileData({
                ...profileData,
                email: text,
              });
            }}
          />
        </View>
        <View style={Style.inputContainer}>
          <DropDown
            items={data}
            onValueChange={value => {
              setProfileData({
                ...profileData,
                gender: value,
              });
            }}
            placeholder={{
              label: 'Select Gender', // Placeholder prompt
              value: null, // Ensure no default selection
            }}
            value={profileData.gender}
          />
        </View>
        <View style={Style.inputContainer}>
          <TextArea
            placeholder="Adress"
            value={profileData.address}
            onChangeText={text => {
              setProfileData({
                ...profileData,
                address: text,
              });
            }}
          />
        </View>
        <View style={{marginTop: 30}}>
          {isLoading ? (
            <Loader />
          ) : (
            <Button label="Submit" onPress={handleSubmit} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
