import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Dimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCodeScanner,
} from 'react-native-vision-camera';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {showErrorToast, showSuccessToast} from '../../../utils/toastMessage';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
const SCANNER_SIZE = width * 0.7;

export default function Scanner() {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  const [permission, setPermission] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultMsg, setResultMsg] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const scannerPosition = useSharedValue(0);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const camRef = useRef(null);

  // Check camera permission and availability
  const checkPermission = useCallback(async () => {
    try {
      setCameraError(null);

      if (Platform.OS === 'android') {
        const hasCameraPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        if (!hasCameraPermission) {
          const res = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          setPermission(res === PermissionsAndroid.RESULTS.GRANTED);
        } else {
          setPermission(true);
        }
      } else {
        const status = await Camera.getCameraPermissionStatus();
        if (status !== 'authorized') {
          const newStatus = await Camera.requestCameraPermission();
          setPermission(newStatus === 'authorized');
        } else {
          setPermission(true);
        }
      }

      // Additional check for camera restrictions
      const availableDevices = await Camera.getAvailableCameraDevices();
      if (availableDevices.length === 0) {
        throw new Error('Camera restricted by device policy');
      }
    } catch (error) {
      setPermission(false);
      if (error.message.includes('restricted')) {
        setCameraError('Camera restricted by device policy');
      } else {
        setCameraError(`Camera error: ${error.message}`);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setResultMsg(null);
      setScannedData(null);
      setIsProcessing(false);
      checkPermission();
    }, []),
  );
  // useEffect(() => {
  //   setResultMsg(null);
  //   checkPermission();
  // }, [checkPermission, setResultMsg]);

  // Save QR code data to backend
  const SaveQRCodeData = async qrData => {
    if (isProcessing) return;

    setResultMsg(null);
    setIsProcessing(true);

    try {
      const response = await postWithHeader(`${Endpoint.qrCodeScan}`, {
        qrcodeid: qrData,
        user_id: user?.id,
      });
      console.log(response);
      if (response.status === true) {
        setResultMsg(response?.message);
        setTimeout(() => navigation.navigate('Dashboard'), 3000);
      } else {
        setScannedData(null);
        setResultMsg(response?.message || 'Invalid QR code');
        setTimeout(() => navigation.navigate('Dashboard'), 3000);
      }
    } catch (e) {
      // showErrorToast('Something went wrong. Please try again.');
      setScannedData(null);
      setResultMsg('Something went wrong. Please try again.');
      setTimeout(() => navigation.navigate('Dashboard'), 3000);
    } finally {
      setIsProcessing(false);
    }
  };
  const extractId = raw => {
    if (!raw) return null; // guard
    const [id] = raw.split('|'); // take text before the first “|”
    return /^\d+$/.test(id.trim()) // digits only?
      ? id.trim()
      : null; // return null if it’s not a number
  };
  // QR Code Scanner configuration
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      const raw = codes[0]?.value;
      const id = raw ? extractId(raw) : null;
      if (id && id !== scannedData && !isProcessing) {
        setScannedData(id);
        SaveQRCodeData(id);
      }
    },
  });

  // Animated scanner line effect
  useEffect(() => {
    scannerPosition.value = withRepeat(
      withTiming(SCANNER_SIZE, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, []);

  const animatedLineStyle = useAnimatedStyle(() => ({
    transform: [{translateY: scannerPosition.value}],
  }));

  // Error state UI
  if (cameraError) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>{cameraError}</Text>
        <TouchableOpacity style={styles.button} onPress={checkPermission}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {marginTop: 10, backgroundColor: '#555'}]}
          onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>Open Settings</Text>
        </TouchableOpacity>
        <Text style={styles.helpText}>
          If this is a work device, contact your IT administrator about camera
          restrictions
        </Text>
      </View>
    );
  }

  // Permission UI states
  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission required</Text>
        <TouchableOpacity style={styles.button} onPress={checkPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Loading camera...</Text>
        <ActivityIndicator color="#00B0F0" size="large" />
      </View>
    );
  }

  // Main render
  return (
    <View style={styles.container}>
      {!resultMsg && (
        <Camera
          ref={camRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={!isProcessing}
          codeScanner={isProcessing ? undefined : codeScanner}
          enableZoomGesture
          onError={error => {
            if (error.code === 'system/camera-is-restricted') {
              setCameraError('Camera restricted by device policy');
            } else {
              setCameraError(`Camera error: ${error.message}`);
            }
          }}
        />
      )}

      {/* Overlay UI */}
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Scan QR Code</Text>
        </View>

        {/* Scanner Frame */}
        {!resultMsg && (
          <View style={styles.scannerContainer}>
            {!isProcessing && (
              <Animated.View style={[styles.scannerLine, animatedLineStyle]} />
            )}
            <Text style={styles.instructionText}>
              {isProcessing ? 'Processing QR code...' : 'Scan QR code'}
            </Text>
          </View>
        )}

        {/* Loading Indicator */}
        {isProcessing && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00B0F0" />
            <Text style={styles.loadingText}>Verifying...</Text>
          </View>
        )}
        {resultMsg && (
          <View style={styles.resultOverlay}>
            <Text style={styles.resultText}>{resultMsg}</Text>
          </View>
        )}
        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Dashboard')}>
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  helpText: {
    color: 'white',
    fontSize: 14,
    marginTop: 30,
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scannerContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  scannerLine: {
    width: SCANNER_SIZE - 20,
    height: 2,
    backgroundColor: '#00B0F0',
    position: 'absolute',
  },
  instructionText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    backgroundColor: '#00B0F0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
  },
  resultOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {color: '#fff', fontSize: 20, marginBottom: 20},
});
