import {Platform, StyleSheet} from 'react-native';
import {theme} from '../../theme';
import fontsFamily from '../../theme/fontsFamily';
import font from '../../theme/font';
import {COLORS} from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: theme.responsive.margin(10),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: theme.responsive.fontSize(font.HEADING),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.responsive.margin(5),
    fontFamily: fontsFamily.medium,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: theme.responsive.fontSize(font.SUB_HEADING),
    textAlign: 'center',
    marginBottom: theme.responsive.margin(5),
    fontFamily: fontsFamily.medium,
  },
  retryButton: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#693B17',
  },
  retryText: {
    color: '#fff',
    fontSize: theme.responsive.fontSize(font.BODY),
    fontWeight: '600',
    fontFamily: fontsFamily.medium,
  },
});

export default styles;
