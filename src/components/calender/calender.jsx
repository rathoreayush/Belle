import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Style from './style';
import moment from 'moment';
// import CALENDER from '../../assets/callender.png';

const Calender = ({
  label,
  mandatory,
  placeholder,

  onConfirm,
  minimumDate,
  selectedDate,
}) => {
  const [isDateTimePickerVisible, setDateTimePickerVisibility] =
    useState(false);
  const [isDateSelect, setDateSelect] = useState('');

  const showDateTimePicker = () => {
    setDateTimePickerVisibility(true);
  };

  const hideDateTimePicker = () => {
    setDateTimePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('DD-MM-YYYY');
    onConfirm(formattedDate);
    setDateSelect(formattedDate);
    hideDateTimePicker();
  };
  useEffect(() => {
    if (selectedDate) {
      setDateSelect(selectedDate); // Set the selected date initially
    }
  }, [selectedDate]);

  return (
    <>
      <TouchableOpacity
        style={Style.inputView}
        activeOpacity={1}
        onPress={showDateTimePicker}>
        <Text style={isDateSelect ? Style.selectedText : Style.placeholderText}>
          {isDateSelect ? isDateSelect : placeholder}
        </Text>
        {/* <Image source={CALENDER} style={Style.calenderImg} /> */}
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDateTimePicker}
        minimumDate={minimumDate}
      />
    </>
  );
};

export default Calender;
