import {View, Text, SafeAreaView, Keyboard, Alert} from 'react-native';
import Style from './Style';
import React, {useState} from 'react';
import CustomHeader from '../../../components/customHeader/customHeader';
import CustomTextInput from '../../../components/textInput/textInput';
import Button from '../../../components/button/button';
import DropDown from '../../../components/dropdown/dropDown';
import {useSelector} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import TextArea from '../../../components/textArea/textArea';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import Loader from '../../../components/loader/loder';
import {showErrorToast} from '../../../utils/toastMessage';
const ReportIssue = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);

  const [loading, setLoading] = useState(false);
  const [reportDta, setReportData] = useState({
    user_id: user?.id,
    issue_category: null,
    issue_subject: null,
    issue_details: null,
  });
  const data = [
    {label: 'Technical', value: 'Technical'},
    {label: 'Functional', value: 'Functional'},
  ];

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (
      !reportDta.issue_category ||
      !reportDta.issue_subject ||
      !reportDta.issue_details
    ) {
      showErrorToast('All fields are mandatory');
      return;
    }
    setLoading(true);
    console.log(`${Endpoint.reportIssue}`, reportDta);
    try {
      const response = await postWithHeader(
        `${Endpoint.reportIssue}`,
        reportDta,
      );
      if (response?.status == true) {
        Alert.alert(
          'Success',
          `Your Issue No is ${response?.issue_no}`,
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
    } catch {
      showErrorToast('Something went wrong, Please try again');
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={Style.screenContainer}>
      <CustomHeader label="Report Issue" />
      <View style={Style.formContainer}>
        <View style={Style.inputContainer}>
          <DropDown
            items={data}
            onValueChange={value => {
              setReportData({
                ...reportDta,
                issue_category: value,
              });
            }}
            placeholder={{
              label: 'Select Category', // Placeholder prompt
              value: null, // Ensure no default selection
            }}
            value={reportDta.issue_category}
          />
        </View>
        <View style={Style.inputContainer}>
          <CustomTextInput
            placeholder="Subject"
            value={reportDta.issue_subject}
            onChangeText={text => {
              setReportData({
                ...reportDta,
                issue_subject: text,
              });
            }}
          />
        </View>
        <View style={Style.inputContainer}>
          <TextArea
            placeholder="Discription"
            value={reportDta.issue_details}
            onChangeText={text => {
              setReportData({
                ...reportDta,
                issue_details: text,
              });
            }}
          />
        </View>

        <View style={{marginTop: 30}}>
          {loading ? (
            <Loader />
          ) : (
            <Button label="Submit" onPress={handleSubmit} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportIssue;
