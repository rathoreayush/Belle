import React from 'react';
import {View, TextInput, Image} from 'react-native';
import Style from './style';
import {COLORS} from '../../theme/colors';

const TextArea = ({
  placeholder,
  icon,
  secureTextEntry,
  value,
  onChangeText,
  keyboardType,
  maxLength,
}) => {
  return (
    <View style={Style.inputContainer}>
      {icon && <Image source={icon} style={Style.icon} />}
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={COLORS.primary}
        style={Style.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        multiline
      />
    </View>
  );
};

export default TextArea;
