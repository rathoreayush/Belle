import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Style from './Style';
import CustomHeader from '../../../components/customHeader/customHeader';
import {getWithHeader, postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import Loader from '../../../components/loader/loder';
import ErrorScreen from '../../../components/error/Error';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const Catalogue = () => {
  const [error, setError] = useState(false);
  const [loading, setoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getCatalogue();
  }, []);

  const getCatalogue = async () => {
    setError(false);
    setoading(true);

    try {
      const response = await getWithHeader(`${Endpoint.catelogues}`);
      console.log(response);
      setData(response?.data || []);
    } catch (e) {
      setError(true);
      console.log('Catalogue API Error:', e);
    } finally {
      setoading(false);
    }
  };

  const downloadCatalogue = async (url, title) => {
    try {
      if (Platform.OS === 'android' && Platform.Version < 30) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs permission to download files to your device.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission Denied',
            'Cannot download without storage permission.',
          );
          return;
        }
      }

      const fileExtension = url.split('.').pop();
      const fileName = `${title.replace(/ /g, '_')}.${fileExtension}`;

      const downloadDest =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}`
          : `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const options = {
        fromUrl: url,
        toFile: downloadDest,
      };

      const result = await RNFS.downloadFile(options).promise;

      if (result.statusCode === 200) {
        Alert.alert('Download Complete', `File saved as ${fileName}`);

        // Open the file
        FileViewer.open(downloadDest, {showOpenWithDialog: true})
          .then(() => {
            console.log('File opened');
          })
          .catch(error => {
            console.log('Error opening file:', error);
            Alert.alert(
              'Open Failed',
              'Download succeeded but failed to open the file.',
            );
          });
      } else {
        Alert.alert('Download Failed', 'Could not download the file.');
      }
    } catch (error) {
      console.log('Download error:', error);
      Alert.alert('Error', 'Something went wrong while downloading the file.');
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        downloadCatalogue(item.catalogue_file, item.catalogue_title)
      }>
      <View style={Style.card}>
        <Image
          source={{uri: item.icon_file}}
          style={Style.image}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={Style.screenContainer}>
      <CustomHeader label="Catalogue" />
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorScreen />
      ) : (
        <View style={Style.container}>
          <Text style={Style.heading}>Download Catalogue</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={Style.row}
            contentContainerStyle={Style.list}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Catalogue;
