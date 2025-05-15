import {StyleSheet} from 'react-native';
import {COLORS} from '../../theme/colors';
import {theme} from '../../theme';
import {SPACING} from '../../theme/spacing';
import {BUTTON_SIZES} from '../../theme/button';
import {BORDER_RADIUS} from '../../theme/boderRadius';
import fontsFamily from '../../theme/fontsFamily';
import font from '../../theme/font';
const Style = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primary,
    width: theme.responsive.width(250),
    height: theme.responsive.height(BUTTON_SIZES.DEFAULT),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
    fontSize: theme.responsive.fontSize(font.SMALL),
  },
});
export default Style;
