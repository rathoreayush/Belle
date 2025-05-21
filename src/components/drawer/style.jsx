import {StyleSheet} from 'react-native';
import {COLORS} from '../../theme/colors';
import {theme} from '../../theme';
import {BORDER_RADIUS} from '../../theme/boderRadius';
import font from '../../theme/font';
import fontsFamily from '../../theme/fontsFamily';

const Style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingTop: theme.responsive.padding(43),
    paddingBottom: theme.responsive.padding(20),
    paddingHorizontal: theme.responsive.padding(20),
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: theme.responsive.width(30),
    height: theme.responsive.height(30),
  },
  nameText: {
    color: COLORS.white,
    fontSize: theme.responsive.fontSize(10),
    fontWeight: '600',
    fontFamily: fontsFamily.bold,
    marginLeft: theme.responsive.margin(14),
  },
  primaryMenuContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderTopRightRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderBottomLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderBottomRightRadius: theme.responsive.borderRadius(
      BORDER_RADIUS.CIRCLE,
    ),
    width: theme.responsive.width(322),
    marginLeft: theme.responsive.margin(-12),
  },
  itemContainer: {
    marginTop: theme.responsive.margin(24),
  },
  logo: {
    width: theme.responsive.width(100),
    height: theme.responsive.height(100),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderWidth: theme.responsive.width(8),
    borderColor: '#F03EA7',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  closeTxt: {
    fontSize: theme.responsive.fontSize(font.LARGE_TITLE),
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.responsive.padding(10),
    paddingHorizontal: theme.responsive.padding(24),
  },
  label: {
    marginLeft: theme.responsive.margin(14),
    fontSize: theme.responsive.fontSize(font.BODY),
    fontFamily: theme.fontsFamily.medium,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: theme.responsive.padding(24),
    marginTop: theme.responsive.margin(10),
    marginBottom: theme.responsive.margin(10),
    fontSize: theme.responsive.fontSize(12),
    fontFamily: theme.fontsFamily.medium,
    color: '#888',
    fontWeight: '700',
    letterSpacing: 1,
  },
  signOut: {
    margin: theme.responsive.margin(24),
    backgroundColor: COLORS.primary,
    paddingVertical: theme.responsive.padding(14),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff0080',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  signOutTxt: {
    color: COLORS.white,
    fontSize: theme.responsive.fontSize(16),
    fontWeight: '600',
    fontFamily: fontsFamily.medium,
  },
});

export default Style;
