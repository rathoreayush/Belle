import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import backBtnLogo from 'assets/images/back-btn.png';
import Style from './Style';
const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={backBtnLogo} style={Style.buttonIcon} />
    </TouchableOpacity>
  );
};

export default BackButton;
