import {StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/colors';
import {theme} from '../../../theme';
import fontsFamily from '../../../theme/fontsFamily';
import {BORDER_RADIUS} from '../../../theme/boderRadius';
const Style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  userContainer: {
    alignSelf: 'center',
  },
  logo: {
    width: theme.responsive.width(100),
    height: theme.responsive.height(100),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderWidth: theme.responsive.width(8),
    borderColor: '#F03EA7',
  },
  formContainer: {
    marginTop: theme.responsive.margin(20),
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: theme.responsive.margin(15),
  },
});

export default Style;
