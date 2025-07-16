import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Style from './style';
import {theme} from '../../theme';
import font from '../../theme/font';
import fontsFamily from '../../theme/fontsFamily';
// import DROP_LOGO from '../../assets/drop.png';
// import DROPUP_LOGO from '../../assets/dropUp.png';

const DropDown = ({
  placeholder,
  label,
  mand,
  index,
  items,
  onChangeText,
  onValueChange,
  disabled,
  value,

  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <View style={Style.fieldContainer}>
      <View style={Style.inputView}>
        <RNPickerSelect
          key={index}
          {...props}
          onValueChange={onValueChange}
          items={items}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          style={{
            inputAndroid: {
              color: 'black',
              fontWeight: 'bold',
              fontWeight: '400',
              fontSize: theme.responsive.fontSize(font.SMALL),
              fontFamily: fontsFamily.medium,
            },
            inputIOS: {
              color: 'black',
              fontWeight: '500',
              paddingLeft: 10,
              paddingTop: 8,
            },
            placeholder: {
              color: '#EB008B',
              fontWeight: '400',
              fontSize: theme.responsive.fontSize(font.SMALL),
              fontFamily: fontsFamily.medium,
            },
          }}
          //   Icon={() => {
          //     return (
          //       <Image
          //         source={isClicked ? DROPUP_LOGO : DROP_LOGO}
          //         style={Style.image}
          //         placeholderTextColor="#D6D6D6"
          //       />
          //     );
          //   }}
          onOpen={() => setIsClicked(true)} // Handle dropdown open state
          onClose={() => setIsClicked(false)}
        />
      </View>
    </View>
  );
};

export default DropDown;
