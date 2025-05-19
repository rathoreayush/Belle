import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Style from './Style';
import UserLogo from 'assets/images/user.png';
import backLogo from 'assets/images/back-arrow.png';
import Notification from 'assets/images/notification.png';
import {useNavigation} from '@react-navigation/native';
const RewardHistory = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all');
  const transactionData = [
    {id: '1', points: 76, type: 'earned'},
    {id: '2', points: 76, type: 'earned'},
    {id: '3', points: -32, type: 'redeemed'},
    {id: '4', points: -76, type: 'redeemed'},
    {id: '5', points: 76, type: 'earned'},
    {id: '6', points: 76, type: 'earned'},
    {id: '7', points: -76, type: 'redeemed'},
    {id: '8', points: 76, type: 'earned'},
  ];

  const filteredData = transactionData.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

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
              {isPositive ? 'You have earned' : 'You have redeemed'}
            </Text>
            <Text
              style={[
                Style.pointText,
                {color: isPositive ? '#E42A93' : '#F54291'},
              ]}>
              {isPositive ? '+' : ''}
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
              <Text style={Style.subTitle}>Ajay Kumar</Text>
            </View>
          </View>
          <View style={Style.rewardContainer}>
            <Text style={Style.rewardContainerCount}>84688</Text>
            <Text style={Style.rewardContainerText}>Reward Points</Text>
          </View>
        </View>
      </View>
      {/* Tabs */}
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
        keyExtractor={item => item.id}
        contentContainerStyle={Style.listContent}
        showsVerticalScrollIndicator={true} // ✅ show scrollbar
        style={{scrollbarColor: 'black'}} //
      />
    </SafeAreaView>
  );
};

export default RewardHistory;
