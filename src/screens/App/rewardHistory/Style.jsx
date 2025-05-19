import {StyleSheet} from 'react-native';
import {theme} from '../../../theme';
import {COLORS} from '../../../theme/colors';
import {BORDER_RADIUS} from '../../../theme/boderRadius';
import fontsFamily from '../../../theme/fontsFamily';
import font from '../../../theme/font';
const Style = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topCurve: {
    height: theme.responsive.height(180),
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
  userIcon: {
    width: theme.responsive.width(40),
    height: theme.responsive.height(40),
    resizeMode: 'contain',
    marginRight: theme.responsive.margin(10),
  },
  title: {
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(18),
    fontWeight: '800',
    fontStyle: 'italic',
  },
  subTitle: {
    color: COLORS.white,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(14),
    fontWeight: '600',
  },
  rewardContainer: {
    width: theme.responsive.width(130),
    height: theme.responsive.height(70),
    backgroundColor: '#f5a6d4',
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardContainerCount: {
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(17),
    fontWeight: '800',
  },
  rewardContainerText: {
    color: COLORS.primary,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(10),
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: theme.responsive.margin(17),
    paddingHorizontal: theme.responsive.padding(20),
    backgroundColor: COLORS.primaryDark,
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
  },
  tabItem: {
    fontSize: theme.responsive.fontSize(font.BODY),
    fontFamily: fontsFamily.regular,
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.MEDIUM),
    color: COLORS.primary,

    height: theme.responsive.height(40),
    //paddingVertical: theme.responsive.padding(7),
    paddingHorizontal: theme.responsive.padding(20),
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
  },
  listContent: {
    paddingHorizontal: theme.responsive.padding(14),
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.SMALL),
    padding: theme.responsive.padding(14),
    marginBottom: theme.responsive.margin(10),
    alignItems: 'center',
  },
  sideBar: {
    width: theme.responsive.width(5),
    height: '100%',
    borderRadius: theme.responsive.borderRadius(5),
    marginRight: theme.responsive.margin(10),
  },
  transactionContent: {
    flex: 1,
  },
  transactionText: {
    fontSize: theme.responsive.fontSize(font.SMALL),
    fontWeight: '500',
    color: '#333',
    fontFamily: fontsFamily.semiBold,
  },
  pointText: {
    fontSize: theme.responsive.fontSize(font.BODY),
    fontWeight: 'bold',
    marginVertical: theme.responsive.margin(2),
    fontFamily: fontsFamily.medium,
  },
  pointsLabel: {
    fontWeight: 'normal',
    color: '#555',
  },
  dateText: {
    fontSize: theme.responsive.fontSize(font.SMALL),
    fontWeight: '500',
    color: '#aaa',
    fontFamily: fontsFamily.medium,
  },
});

export default Style;
