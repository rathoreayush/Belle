import {StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/colors';
import {theme} from '../../../theme';
import fontsFamily from '../../../theme/fontsFamily';
const Style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textContainer: {
    padding: theme.responsive.padding(25),
  },
  text: {
    textAlign: 'justify',
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(12),
    color: COLORS.black,
    fontWeight: '400',
  },
});

export default Style;
