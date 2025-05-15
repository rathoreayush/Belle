import {StyleSheet} from 'react-native';
import {theme} from '../../theme';
import {BORDER_RADIUS} from '../../theme/boderRadius';
import {BUTTON_SIZES} from '../../theme/button';
import {COLORS} from '../../theme/colors';
import fontsFamily from '../../theme/fontsFamily';
import font from '../../theme/font';
const Style = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: theme.responsive.width(250),
    height: theme.responsive.height(BUTTON_SIZES.DEFAULT),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
  },

  input: {
    //flex: 1,
    color: COLORS.black,
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
    fontSize: theme.responsive.fontSize(font.SMALL),
    padding: theme.responsive.padding(10),
    width: theme.responsive.width(250),
  },
});

export default Style;
