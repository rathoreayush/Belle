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
import UserLogo from 'assets/images/user.png';
import backLogo from 'assets/images/back-arrow.png';
import Notification from 'assets/images/notification.png';
import {useNavigation} from '@react-navigation/native';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import {useSelector} from 'react-redux';
import Loader from '../../../components/loader/loder';
import ErrorScreen from '../../../components/error/Error';
const RewardHistory = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  console.log(user?.id);

  useEffect(() => {
    getRewardData();
  }, []);
  const getRewardData = async () => {
    setError(false);
    setLoading(true);
    try {
      const response = await postWithHeader(`${Endpoint.rewardHistory}`, {
        user_id: user?.id,
      });
      console.log('history response', response);
      if (response.status === true) {
        setRewardData(response?.reward_history);
      } else {
        setRewardData([]);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getRewardData();
    setRefreshing(false);
  };

  const filteredData = Array.isArray(rewardData)
    ? rewardData.filter(item =>
        activeTab === 'all' ? true : item.type === activeTab,
      )
    : [];

  const renderItem = ({item}) => {
    const isNegative = item.transaction_type === 'DEBIT';
    return (
      <View style={Style.transactionItem}>
        <View
          style={[
            Style.sideBar,
            {backgroundColor: isNegative ? '#E42A93' : '#F2B343'},
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
              {isNegative ? 'You have earned' : 'You have  redeemed'}
            </Text>
            <Text
              style={[
                Style.pointText,
                {color: isNegative ? '#E42A93' : '#F54291'},
              ]}>
              {isNegative ? '-' : '+'}
              {item.points} <Text style={Style.pointsLabel}>Points</Text>
            </Text>
          </View>
          <Text style={Style.dateText}>08 May 2025</Text>
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
          <Text style={Style.screenText}>Reward History</Text>
          <TouchableOpacity>
            <Image source={Notification} style={Style.notificationIcon} />
          </TouchableOpacity>
        </View>
        <View style={Style.infoContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image source={UserLogo} style={Style.userIcon} />
            <View>
              <Text style={Style.title}>Welcome Back !</Text>
              <Text style={Style.subTitle}>{user?.name}</Text>
            </View>
          </View>
          <View style={Style.rewardContainer}>
            <Text style={Style.rewardContainerCount}>
              {user?.point_balance}
            </Text>
            <Text style={Style.rewardContainerText}>Reward Points</Text>
          </View>
        </View>
      </View>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorScreen onRetry={getRewardData} />
      ) : (
        <>
          <View style={Style.tabs}>
            {['all', 'earned', 'redeemed'].map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                <Text
                  style={[
                    Style.tabItem,
                    activeTab === tab && Style.activeTab,
                    activeTab === tab && {color: '#fff', fontWeight: '700'},
                  ]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Transactions */}
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.transaction_id}
            contentContainerStyle={Style.listContent}
            showsVerticalScrollIndicator={true} // ✅ show scrollbar
            style={{scrollbarColor: 'black'}} //
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#E42A93"
              />
            }
          />
        </>
      )}
      {/* Tabs */}
    </SafeAreaView>
  );
};

export default RewardHistory;
