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
    height: theme.responsive.height(245),
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderBottomRightRadius: theme.responsive.borderRadius(
      BORDER_RADIUS.CIRCLE,
    ),
    marginLeft: theme.responsive.margin(5),
    marginRight: theme.responsive.margin(5),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.responsive.margin(10),
    padding: theme.responsive.padding(18),
  },
  userIcon: {
    width: theme.responsive.width(40),
    height: theme.responsive.height(40),
    resizeMode: 'contain',
    marginRight: theme.responsive.margin(10),
  },
  notificationIcon: {
    width: theme.responsive.width(60),
    height: theme.responsive.height(50),
    resizeMode: 'contain',
    // tintColor: COLORS.white,
  },
  title: {
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(16),
    fontWeight: '800',
    fontStyle: 'italic',
  },
  subTitle: {
    color: COLORS.white,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(13),
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.responsive.width(200),
    padding: theme.responsive.padding(5),
    marginLeft: theme.responsive.margin(10),
    marginRight: theme.responsive.margin(10),
  },
  locationLogo: {
    width: theme.responsive.width(30),
    resizeMode: 'contain',
    height: theme.responsive.height(20),
  },
  locationText: {
    color: COLORS.white,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(font.SMALL),
  },
  rewardContainer: {
    width: theme.responsive.width(130),
    height: theme.responsive.height(70),
    backgroundColor: '#f5a6d4',
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  rewardContainerCount: {
    color: COLORS.white,
    fontFamily: fontsFamily.bold,
    fontSize: theme.responsive.fontSize(14),
    fontWeight: '800',
  },
  rewardContainerText: {
    color: COLORS.primary,
    fontFamily: fontsFamily.medium,
    fontSize: theme.responsive.fontSize(10),
  },
  coin: {
    backgroundColor: COLORS.primary,
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    width: theme.responsive.width(35),
    height: theme.responsive.height(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.responsive.margin(2),
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carousel: {
    marginHorizontal: theme.responsive.margin(4),
    marginTop: theme.responsive.margin(1),
    borderRadius: theme.responsive.borderRadius(10),
    overflow: 'hidden',
  },
  actionButtonsContainer: {
    marginTop: theme.responsive.margin(73),
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    borderTopLeftRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderTopRightRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
  },
  actionCard: {
    width: theme.responsive.width(140),
    height: theme.responsive.height(110),
    alignItems: 'center',
    marginVertical: theme.responsive.margin(24),
    padding: theme.responsive.padding(3),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.MEDIUM),
    backgroundColor: COLORS.primaryDark,
  },
  actionLabelContainer: {
    backgroundColor: COLORS.primary,
    position: 'relative',
    width: theme.responsive.width(120),
    height: theme.responsive.height(40),
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.LARGE),
  },
  actionLabel: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: theme.responsive.fontSize(9),
    fontFamily: fontsFamily.semiBold,
    fontStyle: 'italic',
  },
  cardImg: {
    width: theme.responsive.width(70),
    height: theme.responsive.height(80),
    resizeMode: 'contain',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    width: theme.responsive.width(360),
    height: theme.responsive.height(65),
    alignSelf: 'center',
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    borderWidth: theme.responsive.width(3),
    borderColor: COLORS.primaryDark,
    position: 'relative',
    top: 60,
    zIndex: 3,
    shadowColor: '#000',
    shadowOpacity: 4,
    //shadowRadius: 5,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLogo: {
    width: theme.responsive.width(70),
    height: theme.responsive.height(47),
    resizeMode: 'contain',
  },
  navLabel: {
    color: COLORS.white,
    fontSize: theme.responsive.fontSize(8),
    fontFamily: fontsFamily.regular,
    fontWeight: '600',
  },
  scanButton: {
    backgroundColor: COLORS.primary,
    borderWidth: theme.responsive.width(5),
    borderColor: COLORS.primaryDark,
    padding: theme.responsive.padding(10),
    borderRadius: theme.responsive.borderRadius(BORDER_RADIUS.CIRCLE),
    position: 'relative',
    bottom: 24,
  },
  scanLogo: {
    width: theme.responsive.width(40),
    height: theme.responsive.height(47),
    resizeMode: 'contain',
  },
  bottomCurve: {
    marginTop: theme.responsive.margin(30),
    flex: 1,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: theme.responsive.borderRadius(25),
    borderTopRightRadius: theme.responsive.borderRadius(25),
  },
  marginTop: {
    marginTop: theme.responsive.margin(220),
  },
});

export default Style;
