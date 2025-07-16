import {StyleSheet, Platform} from 'react-native';
import {theme} from '../../theme';
import {BORDER_RADIUS} from '../../theme/boderRadius';
import {COLORS} from '../../theme/colors';
import fontsFamily from '../../theme/fontsFamily';
import font from '../../theme/font';
import {BUTTON_SIZES} from '../../theme/button';
const Style = StyleSheet.create({
  placeholderText: {
    color: COLORS.primary,
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
    fontSize: theme.responsive.fontSize(font.SMALL),
    padding: theme.responsive.padding(10),
  },
  selectedText: {
    color: COLORS.black,
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
    fontSize: theme.responsive.fontSize(font.SMALL),
    padding: theme.responsive.padding(10),
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
    width: theme.responsive.width(250),
    height: theme.responsive.height(BUTTON_SIZES.DEFAULT),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    justifyContent: 'space-between',
  },
});

export default Style;
