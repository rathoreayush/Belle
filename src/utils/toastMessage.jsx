import Toast, {BaseToast} from 'react-native-toast-message';
import {StyleSheet} from 'react-native';
import fontsFamily from '../theme/fontsFamily';

// Function to show a success toast
export const showSuccessToast = message => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    visibilityTime: 3000,
    position: 'bottom',
  });
};

// Function to show an error toast
export const showErrorToast = message => {
  Toast.show({
    type: 'error',
    text1: '',
    text2: message,
    visibilityTime: 3000,
    position: 'bottom',
  });
};

// Custom Toast configuration for success and error toasts
export const toastConfig = {
  success: ({text1, text2, ...rest}) => (
    <BaseToast
      {...rest}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1={text1}
      text2={text2}
    />
  ),
  error: ({text1, text2, ...rest}) => (
    <BaseToast
      {...rest}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text1={text1}
      text2={text2}
    />
  ),
};

// Styles for custom toasts
const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: '#4CAF50', // Green border for success
    backgroundColor: '#4CAF50', // Light green background for success
  },
  errorToast: {
    borderLeftColor: '#F44336', // Red border for error
    backgroundColor: '#F44336', // Light red background for error
  },
  contentContainer: {
    paddingHorizontal: 15, // Padding inside the toast
  },
  text1: {
    fontSize: 1,
    fontWeight: 'bold',
    color: '#fff', // Dark text color for the main message
    fontFamily: fontsFamily.semiBold,
  },
  text2: {
    fontSize: 10,
    color: '#fff', // Slightly lighter text color for the secondary message
    fontFamily: fontsFamily.semiBold,
  },
});
