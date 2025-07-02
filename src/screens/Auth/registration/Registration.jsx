import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Style from './Style';
import Icon from 'assets/images/icon04.png';
import CustomTextInput from '../../../components/textInput/textInput';
import Button from '../../../components/button/button';
import BackButton from '../../../components/backButton/backButton';
import {useNavigation} from '@react-navigation/native';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import Loader from '../../../components/loader/loder';
import {showErrorToast} from '../../../utils/toastMessage';

const Registration = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    phone: null,
    gender: null,
    dob: null,
    parent_id: 1,
  });

  const formValidation = formData => {
    const errors = {};

    if (!formData.name || formData.name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (!formData.email || formData.email.trim() === '') {
      errors.email = 'Email is required';
    }

    if (!formData.phone || formData.phone.trim() === '') {
      errors.phone = 'Phone number is required';
    }

    if (!formData.gender || formData.gender.trim() === '') {
      errors.gender = 'Gender is required';
    }

    const dobRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!formData.dob || !dobRegex.test(formData.dob)) {
      errors.dob = 'DOB must be in dd-mm-yyyy format';
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = formValidation(formData);

    if (Object.keys(errors).length > 0) {
      showErrorToast(Object.values(errors).join('\n'));
      return;
    }
    console.log(`${Endpoint.userRegistration}`, {
      formData,
    });
    setLoading(true);
    try {
      const response = await postWithHeader(`${Endpoint.userRegistration}`, {
        formData,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={Style.screenContainer}>
      <ScrollView>
        <View style={Style.topCurve}>
          <View style={Style.textContainer}>
            <Text style={Style.heading}>Let's</Text>
            <Text style={Style.subheading}>Create</Text>
            <Text style={Style.subheading}>Your</Text>
            <Text style={Style.subheading}>Account</Text>
          </View>
          <View>
            <Image source={Icon} style={Style.logo} />
          </View>
        </View>

        <View style={Style.stepperContainer}>
          <View style={Style.infoTextContainer}>
            <Text style={Style.infoText}>Basic Information</Text>
          </View>
          <View style={Style.inputContainer}>
            <CustomTextInput
              placeholder="Name"
              onChangeText={text => {
                setFormData({
                  ...formData,
                  name: text,
                });
              }}
            />
          </View>
          <View style={Style.inputContainer}>
            <CustomTextInput
              placeholder="Email Address"
              onChangeText={text => {
                setFormData({
                  ...formData,
                  email: text,
                });
              }}
            />
          </View>
          <View style={Style.inputContainer}>
            <CustomTextInput
              placeholder="Phone Number"
              keyboardType="numeric"
              onChangeText={text => {
                setFormData({
                  ...formData,
                  phone: text,
                });
              }}
            />
          </View>
          <View style={Style.inputContainer}>
            <CustomTextInput
              placeholder="Gender"
              onChangeText={text => {
                setFormData({
                  ...formData,
                  gender: text,
                });
              }}
            />
          </View>
          <View style={Style.inputContainer}>
            <CustomTextInput
              placeholder="Date of Birth (dd-mm-yyyy)"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => {
                // Remove all non-digit characters
                const cleaned = text.replace(/\D+/g, '');

                let formatted = cleaned;
                if (cleaned.length >= 3 && cleaned.length <= 4) {
                  formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
                } else if (cleaned.length > 4) {
                  formatted = `${cleaned.slice(0, 2)}-${cleaned.slice(
                    2,
                    4,
                  )}-${cleaned.slice(4, 8)}`;
                }

                setFormData({
                  ...formData,
                  dob: formatted,
                });
              }}
              value={formData.dob}
            />
          </View>
        </View>

        <View style={Style.buttonContainer}>
          {loading ? (
            <Loader />
          ) : (
            <Button label="Sign Up" onPress={handleSubmit} />
          )}
        </View>

        <View style={Style.signContainer}>
          <Text style={Style.signText}>Have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={Style.signText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Registration;
