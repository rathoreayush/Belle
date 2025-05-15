import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';
import {COLORS} from '../../../theme/colors';
import {BORDER_RADIUS} from '../../../theme/boderRadius';
import fontsFamily from '../../../theme/fontsFamily';
import font from '../../../theme/font';
const Style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topCurve: {
    height: theme.responsive.height(150),
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: theme.responsive.borderRadius(130),
    borderBottomRightRadius: theme.responsive.borderRadius(130),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.responsive.margin(99),
  },
  logo: {
    width: theme.responsive.width(199),
    height: theme.responsive.height(171),
  },
  formSection: {
    marginTop: theme.responsive.margin(210),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderTopRightRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    width: theme.responsive.width(360),

    padding: theme.responsive.padding(10),
    alignItems: 'center',
    // position: 'relative',
    // bottom: 0,
    alignSelf: 'center',
    flex: 1,
  },
  inputContainer: {
    marginTop: theme.responsive.margin(20),
  },
  buttonContainer: {
    marginTop: theme.responsive.margin(25),
  },
  textContainer: {
    padding: theme.responsive.padding(10),
  },
  text: {
    color: COLORS.primary,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(font.SMALL),
    fontWeight: '600',
  },
  resendText: {
    color: COLORS.primary,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(font.SMALL),
    fontWeight: '500',
  },
  resendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: theme.responsive.margin(20),
  },
  backButton: {
    marginTop: theme.responsive.margin(50),
  },
  otpInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: theme.responsive.width(40),
    height: theme.responsive.height(42),
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.MEDIUM),
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
    fontSize: theme.responsive.fontSize(font.SMALL),
    margin: theme.responsive.margin(10),
  },
});

export default Style;
