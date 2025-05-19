import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Style from './Style';
import UserLogo from 'assets/images/user.png';
import Notification from 'assets/images/notification.png';
import MAPLOGO from 'assets/images/map.png';
import REDMELOGO from 'assets/images/004.png';
import REWARDLOGO from 'assets/images/003.png';
import CATALOGUELOGO from 'assets/images/002.png';
import MEDIALOGO from 'assets/images/001.png';
import Home from 'assets/images/home.png';
import Report from 'assets/images/help.png';
import Profile from 'assets/images/avtar.png';
import Feedback from 'assets/images/reward.png';
import Scan from 'assets/images/scan.png';
import Carousel from 'components/carousel/carousel';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const Dashboard = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.auth);
  return (
    <SafeAreaView style={Style.screenContainer}>
      <View style={Style.topCurve}>
        <View style={Style.infoContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={UserLogo} style={Style.userIcon} />
            </TouchableOpacity>
            <View>
              <Text style={Style.title}>Welcome Back !</Text>
              <Text style={Style.subTitle}>{user?.name}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image source={Notification} style={Style.notificationIcon} />
          </TouchableOpacity>
        </View>
        <View style={Style.sectionContainer}>
          <View style={Style.locationContainer}>
            <Image source={MAPLOGO} style={Style.locationLogo} />
            <Text style={Style.locationText}>
              UGF - 19 Dewika Tower, Ghaziabad, Pin - 201011 (UP)
            </Text>
          </View>
          <View style={Style.rewardContainer}>
            <Text style={Style.rewardContainerCount}>
              {user?.point_balance}
            </Text>
            <Text style={Style.rewardContainerText}>Reward Points</Text>
          </View>
        </View>
        <View style={Style.carousel}>
          <Carousel />
        </View>
      </View>
      <View style={Style.actionButtonsContainer}>
        <View style={Style.actionButtons}>
          {[
            {label: 'Redeem Points', img: REDMELOGO, route: 'RewardHistory'},
            {label: 'Reward History', img: REWARDLOGO, route: 'RewardHistory'},
            {
              label: 'All Catalogue',
              img: CATALOGUELOGO,
              route: 'RewardHistory',
            },
            {label: 'Media', img: MEDIALOGO, route: 'RewardHistory'},
          ].map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={Style.actionCard}
              onPress={() => {
                if (btn.route) {
                  navigation.navigate(btn.route);
                }
              }}>
              <Image source={btn.img} style={Style.cardImg} />
              <View style={Style.actionLabelContainer}>
                <Text style={Style.actionLabel}>{btn.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Bottom Navigation */}
      <View style={Style.bottomNav}>
        <TouchableOpacity style={Style.navItem}>
          <Image source={Home} style={Style.tabLogo} />
          <Text style={Style.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.navItem}>
          <Image source={Feedback} style={Style.tabLogo} />
          <Text style={Style.navLabel}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Style.scanButton}
          onPress={() => navigation.navigate('Scanner')}>
          <Image source={Scan} style={Style.scanLogo} />
        </TouchableOpacity>

        <TouchableOpacity style={Style.navItem}>
          <Image source={Report} style={Style.tabLogo} />
          <Text style={Style.navLabel}>Report Issue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Style.navItem}>
          <Image source={Profile} style={Style.tabLogo} />
          <Text style={Style.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={Style.bottomCurve}></View>
    </SafeAreaView>
  );
};

export default Dashboard;
