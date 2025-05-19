import {StyleSheet} from 'react-native';
import {theme} from 'theme';
import {COLORS} from 'theme/colors';
import {BORDER_RADIUS} from 'theme/boderRadius';
import fontsFamily from 'theme/fontsFamily';
import font from 'theme/font';
const Style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topCurve: {
    height: theme.responsive.height(100),
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderBottomRightRadius: theme.responsive.borderRadius(
      BORDER_RADIUS.CIRCLE,
    ),
    borderTopLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.SMALL),
    borderTopRightRadius: theme.responsive.borderRadius(BORDER_RADIUS.SMALL),
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: theme.responsive.padding(10),
    paddingLeft: theme.responsive.padding(10),
    marginTop: theme.responsive.margin(10),
  },
  screenText: {
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(18),
    fontWeight: '800',
    fontStyle: 'italic',
  },
  notificationIcon: {
    width: theme.responsive.width(60),
    height: theme.responsive.height(50),
    resizeMode: 'contain',
    // tintColor: COLORS.white,
  },
  backIcon: {
    width: theme.responsive.width(40),
    height: theme.responsive.height(23),
    resizeMode: 'contain',
    marginRight: theme.responsive.margin(10),
    tintColor: COLORS.white,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.responsive.margin(1),
    padding: theme.responsive.padding(18),
  },

  listContent: {
    paddingHorizontal: theme.responsive.padding(14),
  },
});

export default Style;
