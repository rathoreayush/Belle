import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Style from './Style';
import backLogo from 'assets/images/back-arrow.png';
import Notification from 'assets/images/notification.png';
import {useNavigation} from '@react-navigation/native';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import {useSelector} from 'react-redux';
import Loader from '../../../components/loader/loder';
import ErrorScreen from '../../../components/error/Error';
const ScanHistory = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  const [scanData, setScanData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getScanData();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getScanData();
    setRefreshing(false);
  };
  const getScanData = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await postWithHeader(`${Endpoint.qrCodeScanList}`, {
        user_id: user?.id,
      });
      //   console.log(response);
      if (response?.status === true) {
        setScanData(response?.scan_list);
      } else {
        setScanData([]);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item}) => {
    const isPositive = item.points > 0;
    return (
      <View style={Style.transactionItem}>
        <View
          style={[
            Style.sideBar,
            {backgroundColor: isPositive ? '#E42A93' : '#F2B343'},
          ]}
        />
        <View style={Style.transactionContent}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={Style.transactionText}>
              {item?.description || 'Not Available'} {item?.item_code}
            </Text>
            <Text
              style={[
                Style.pointText,
                {color: isPositive ? '#E42A93' : '#F54291'},
              ]}>
              {isPositive ? '+' : ''}
              {item.earned_point} <Text style={Style.pointsLabel}>Points</Text>
            </Text>
          </View>
          <Text style={Style.dateText}>
            {item?.scan_date || 'Not Available'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={Style.screenContainer}>
      <View style={Style.topCurve}>
        <View style={Style.backContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backLogo} style={Style.backIcon} />
          </TouchableOpacity>
          <Text style={Style.screenText}>Scan History</Text>
          <TouchableOpacity>
            <Image source={Notification} style={Style.notificationIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorScreen onRetry={getScanData} />
      ) : (
        <FlatList
          data={scanData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          contentContainerStyle={Style.listContent}
          showsVerticalScrollIndicator={true} // ✅ show scrollbar
          style={{scrollbarColor: 'black'}} //
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={Style.nosurveyView}>
              <Text style={Style.nosurvey}>No Record Found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ScanHistory;
