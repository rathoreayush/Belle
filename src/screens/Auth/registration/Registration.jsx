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

const Registration = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  // Step components as functions (not JSX directly)
  const steps = [() => <StepOne />, () => <StepTwo />, () => <StepThree />];

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

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

        <View style={Style.stepperContainer}>{steps[currentStep]()}</View>

        <View style={Style.buttonContainer}>
          {currentStep < steps.length - 1 ? (
            <Button label="Next" onPress={nextStep} />
          ) : (
            <Button label="Sign Up" onPress={() => console.log('Submitted')} />
          )}
          {currentStep > 0 && <BackButton onPress={prevStep} />}
        </View>

        <View style={Style.signContainer}>
          <Text style={Style.signText}>Have an account ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={Style.signText}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StepOne = () => (
  <>
    <View style={Style.infoTextContainer}>
      <Text style={Style.infoText}>Basic Information</Text>
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Full Name" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Email Address" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="WhatsApp Number" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Password" secureTextEntry />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Re - Enter Password" secureTextEntry />
    </View>
  </>
);

const StepTwo = () => (
  <>
    <View style={Style.infoTextContainer}>
      <Text style={Style.infoText}>Shop Address Information</Text>
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Shop Name" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Shop Address" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Distributor Firm Name" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Salesperson's Name" />
    </View>
  </>
);

const StepThree = () => (
  <>
    <View style={Style.infoTextContainer}>
      <Text style={Style.infoText}>Address Information</Text>
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Pincode" keyboardType="numeric" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="State" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="District" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="City" />
    </View>
    <View style={Style.inputContainer}>
      <CustomTextInput placeholder="Landmark" />
    </View>
  </>
);

export default Registration;
