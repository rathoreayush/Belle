import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Style from './style';
const Button = ({onPress, label}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={Style.buttonContainer}>
        <Text style={Style.buttonText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
