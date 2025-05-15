import {StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/colors';
import {theme} from '../../../theme';
import {BORDER_RADIUS} from '../../../theme/boderRadius';
import {BUTTON_SIZES} from '../../../theme/button';
import font from '../../../theme/font';
import fontsFamily from '../../../theme/fontsFamily';
const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topSection: {
    marginVertical: theme.responsive.margin(80),
    width: theme.responsive.width(190),
    height: theme.responsive.height(190),
    backgroundColor: '#fff',
    borderRadius: theme.responsive.borderRadius(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: theme.responsive.width(199),
    height: theme.responsive.height(171),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formSection: {
    marginTop: theme.responsive.margin(78),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderTopRightRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    width: theme.responsive.width(360),
    padding: theme.responsive.padding(10),
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: theme.responsive.margin(20),
  },
  buttonContainer: {
    marginTop: theme.responsive.margin(30),
  },
  forgotPassword: {
    color: '#EF3CA6',
    fontSize: theme.responsive.fontSize(10),
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
    marginTop: theme.responsive.margin(15),
  },

  orText: {
    marginVertical: theme.responsive.margin(10),
    color: '#EF3CA6',
    fontSize: theme.responsive.fontSize(10),
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
  },
  createButton: {
    backgroundColor: '#f484c3',
    width: theme.responsive.width(250),
    height: theme.responsive.height(BUTTON_SIZES.DEFAULT),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  createText: {
    color: COLORS.white,
    fontFamily: fontsFamily.medium,
    fontWeight: '400',
    fontSize: theme.responsive.fontSize(font.SMALL),
  },
});

export default Style;
