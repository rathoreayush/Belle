import {StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/colors';
import {theme} from '../../../theme';
import {BORDER_RADIUS} from '../../../theme/boderRadius';
import fontsFamily from '../../../theme/fontsFamily';
import font from '../../../theme/font';
const Style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topCurve: {
    height: theme.responsive.height(250),
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderBottomRightRadius: theme.responsive.borderRadius(
      BORDER_RADIUS.CIRCLE,
    ),
    flexDirection: 'row',
    justifyContent: 'center',
    //position: 'relative',
    marginLeft: theme.responsive.margin(5),
    marginRight: theme.responsive.margin(5),
  },
  textContainer: {
    padding: theme.responsive.padding(30),
  },
  heading: {
    color: COLORS.white,
    fontFamily: fontsFamily.regular,
    fontSize: theme.responsive.fontSize(font.LARGE_TITLE),
    letterSpacing: 2,
    fontWeight: '600',
    marginBottom: theme.responsive.margin(-5),
  },
  subheading: {
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(font.LARGE_TITLE),
    letterSpacing: 2,
    fontWeight: '700',
  },
  logo: {
    width: theme.responsive.width(180),
    // height: theme.responsive.height(180),
    resizeMode: 'contain',
  },
  stepperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: theme.responsive.margin(20),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.responsive.margin(30),
  },
  infoTextContainer: {
    marginTop: theme.responsive.margin(15),
  },
  infoText: {
    color: 'green',
    fontFamily: fontsFamily.regular,
    fontSize: theme.responsive.fontSize(font.SMALL),
    letterSpacing: 1,
    fontWeight: '700',
  },
  signContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.responsive.margin(16),
  },
  signText: {
    color: COLORS.primary,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(13),
  },
});
export default Style;
