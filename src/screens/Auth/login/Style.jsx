import {StyleSheet} from 'react-native';
import {COLORS} from '../../../theme/colors';
import {theme} from '../../../theme';
import {BORDER_RADIUS} from '../../../theme/boderRadius';
import {BUTTON_SIZES} from '../../../theme/button';
import font from '../../../theme/font';
import fontsFamily from '../../../theme/fontsFamily';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  /* ─────────────── Splash logo ─────────────── */
  topSection: {
    marginVertical: theme.responsive.margin(80),
    width: theme.responsive.width(190),
    height: theme.responsive.height(190),
    backgroundColor: COLORS.white,
    borderRadius: theme.responsive.borderRadius(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logo: {
    width: theme.responsive.width(199),
    height: theme.responsive.height(171),
    resizeMode: 'contain',
  },

  /* ─────────────── Form panel ─────────────── */
  formSection: {
    marginTop: theme.responsive.margin(60), // was absolute; now flow layout
    backgroundColor: COLORS.white,
    borderTopLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderTopRightRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    width: theme.responsive.width(360),
    padding: theme.responsive.padding(10),
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },

  buttonContainer: {
    marginTop: theme.responsive.margin(30),
  },

  /* ─────────────── OTP input row ─────────────── */
  otpInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: theme.responsive.width(40),
    height: theme.responsive.height(48),
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.MEDIUM),
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(13),
    margin: theme.responsive.margin(10),
  },

  text: {
    color: COLORS.primary,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(font.SMALL),
    fontWeight: '600',
  },

  showContainer: {
    alignSelf: 'flex-start',
    padding: theme.responsive.padding(5),
    marginLeft: theme.responsive.margin(40),
    marginTop: theme.responsive.margin(10),
  },
  /* ─────────────── Misc ─────────────── */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: COLORS.white,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(10),
  },
});
