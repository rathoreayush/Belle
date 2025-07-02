import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Style from './Style';
import UserLogo from 'assets/images/user.png';
import backLogo from 'assets/images/back-arrow.png';
import Notification from 'assets/images/notification.png';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {postWithHeader} from '../../../services/api';
import Endpoint from '../../../api/endpoints';
import {useSelector} from 'react-redux';
import Loader from '../../../components/loader/loder';
import ErrorScreen from '../../../components/error/Error';
import {showErrorToast, showSuccessToast} from '../../../utils/toastMessage';

const RedeemPoint = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);

  const [isLoading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [rewardData, setRewardData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const getRewardData = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    else setRefreshing(true);

    setError(false);
    try {
      const response = await postWithHeader(`${Endpoint.redeemPoint}`, {
        user_id: user?.id,
      });

      if (response.status === true) {
        setRewardData(response?.productlist);
      } else {
        setRewardData([]);
      }
    } catch {
      setError(true);
    } finally {
      if (!isRefresh) setLoading(false);
      else setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getRewardData();
    }, []),
  );

  // const renderItem = ({item}) => {
  //   const isPositive = item.points > 0;

  //   return (
  //     <View style={Style.transactionItem}>
  //       <View
  //         style={[
  //           Style.sideBar,
  //           {backgroundColor: isPositive ? '#E42A93' : '#F2B343'},
  //         ]}
  //       />
  //       <View style={Style.transactionContent}>
  //         {/* ✅ Handle image visibility */}
  //         <Image
  //           source={{uri: item.rproduct_img}}
  //           style={Style.productImg}
  //           resizeMode="contain"
  //         />
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //             justifyContent: 'space-between',
  //           }}>
  //           <Text style={Style.transactionText}>{item?.rproduct_name}</Text>
  //           <Text
  //             style={[
  //               Style.pointText,
  //               {color: isPositive ? '#E42A93' : '#F54291'},
  //             ]}>
  //             {item?.point_cost}
  //             {item.points} <Text style={Style.pointsLabel}>Points</Text>
  //           </Text>
  //         </View>
  //         <Text style={Style.dateText}>{item?.created_date}</Text>
  //       </View>
  //     </View>
  //   );
  // };

  const toggleSelect = id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const handleRedeem = () => {
    const totalPoints = selectedIds.length * 180;
    if (selectedIds.length === 0) {
      showErrorToast('Please select an item to redeem');
      return;
    }
    if (totalPoints > points) {
      showErrorToast('Insufficient points');
      return;
    }
    setPoints(prev => prev - totalPoints);
    setSelectedIds([]);
    showSuccessToast('Redeemed successfully !');
  };

  const renderItem = ({item}) => {
    const isSelected = selectedIds.includes(item.rproduct_id);
    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item.rproduct_id)}
        style={[Style.card, isSelected && Style.selectedCard]}>
        <View style={[Style.checkCircle, isSelected && Style.checked]} />
        <Image source={{uri: item.rproduct_img}} style={Style.rewardImage} />
        <Text style={Style.rewardName}>{item?.rproduct_name}</Text>
        <Text style={Style.rewardPoints}>{item?.point_cost} Points</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={Style.screenContainer}>
      <View style={Style.topCurve}>
        <View style={Style.backContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backLogo} style={Style.backIcon} />
          </TouchableOpacity>
          <Text style={Style.screenText}>Product Redeem</Text>
          <TouchableOpacity>
            <Image source={Notification} style={Style.notificationIcon} />
          </TouchableOpacity>
        </View>
        <View style={Style.infoContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
        <ErrorScreen onRetry={() => getRewardData()} />
      ) : (
        <>
          <FlatList
            data={rewardData}
            renderItem={renderItem}
            keyExtractor={item => item.rproduct_id?.toString()}
            // contentContainerStyle={Style.listContent}
            contentContainerStyle={Style.grid}
            numColumns={2}
            showsVerticalScrollIndicator={true}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => getRewardData(true)}
                tintColor="#E42A93"
              />
            }
          />
          <TouchableOpacity style={Style.redeemButton} onPress={handleRedeem}>
            <Text style={Style.redeemText}>Redeem</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default RedeemPoint;
