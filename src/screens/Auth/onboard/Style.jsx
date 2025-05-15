import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';
import {COLORS} from '../../../theme/colors';
import fontsFamily from '../../../theme/fontsFamily';
import font from '../../../theme/font';

const Style = StyleSheet.create({
  screenContainer: {
    //flex: 1,
    height: theme.responsive.height(820),
  },
  //   topCurve: {
  //     height: theme.responsive.height(150),
  //     backgroundColor: COLORS.white,
  //     borderBottomLeftRadius: theme.responsive.borderRadius(130),
  //     borderBottomRightRadius: theme.responsive.borderRadius(130),
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     position: 'relative',
  //   },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.responsive.margin(96),
  },
  logo: {
    width: theme.responsive.width(199),
    height: theme.responsive.height(171),
  },
  loginText: {
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
    padding: theme.responsive.padding(20),
    fontSize: theme.responsive.fontSize(font.LARGE_TITLE),
    marginTop: theme.responsive.margin(20),
  },
  cardContainer: {
    padding: theme.responsive.padding(20),
  },

  card: {
    width: theme.responsive.width(225),
    backgroundColor: COLORS.primaryDark,
    borderTopRightRadius: theme.responsive.borderRadius(40),
    borderBottomRightRadius: theme.responsive.borderRadius(40),
    paddingVertical: theme.responsive.padding(12),
    paddingHorizontal: theme.responsive.padding(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    color: COLORS.primary,
    fontSize: theme.responsive.fontSize(font.HEADING),
    fontWeight: 'bold',
    fontFamily: fontsFamily.bold,
  },
  cardIcon: {
    width: theme.responsive.width(45),
    height: theme.responsive.height(45),

    tintColor: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: theme.responsive.borderRadius(100),
  },
});
export default Style;
