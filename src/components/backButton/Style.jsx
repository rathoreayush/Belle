import {StyleSheet} from 'react-native';
import {COLORS} from 'theme/colors';
import {theme} from 'theme';

const Style = StyleSheet.create({
  buttonIcon: {
    tintColor: COLORS.primary,
    width: theme.responsive.width(30),
    height: theme.responsive.height(50),
    resizeMode: 'contain',
  },
});
export default Style;
