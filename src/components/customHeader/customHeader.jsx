import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Style from './style';
import backLogo from 'assets/images/back-arrow.png';
import Notification from 'assets/images/notification.png';
import {useNavigation} from '@react-navigation/native';
const CustomHeader = ({label}) => {
  const navigation = useNavigation();
  return (
    <View style={Style.topCurve}>
      <View style={Style.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={backLogo} style={Style.backIcon} />
        </TouchableOpacity>
        <Text style={Style.screenText}>{label}</Text>
        <TouchableOpacity>
          <Image source={Notification} style={Style.notificationIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;
