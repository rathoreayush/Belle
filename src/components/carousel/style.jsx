import {StyleSheet} from 'react-native';
import {theme} from '../../theme';
import {BORDER_RADIUS} from '../../theme/boderRadius';
const Style = StyleSheet.create({
  image: {
    width: theme.responsive.width(300),
    height: theme.responsive.height(150),
    borderRadius: theme.responsive.borderRadius(26),
    resizeMode: 'contain',
  },
  list: {
    width: theme.responsive.width(300),
    padding: theme.responsive.padding(1),
  },
  container: {
    alignItems: 'center',
  },
});

export default Style;
