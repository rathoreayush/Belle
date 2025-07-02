import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LOGO from 'assets/images/belle-logo.png';
import backgroundLogo from 'assets/images/backgroundImg.jpeg';
import logoFirst from 'assets/images/icon01.png';
import logoReatailer from 'assets/images/icon02.png';
import saleTeam from 'assets/images/icon03.png';
import Style from './Style';
import {useNavigation} from '@react-navigation/native';
import {UserRoles} from '../../../constants/role';
const Onboard = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ImageBackground
        source={backgroundLogo}
        style={Style.screenContainer}
        resizeMode="cover">
        <View>
          <View style={Style.logoContainer}>
            <Image source={LOGO} style={Style.logo} resizeMode="contain" />
          </View>
        </View>

        <Text style={Style.loginText}>Login as a</Text>

        <View style={Style.cardContainer}>
          <TouchableOpacity
            style={Style.card}
            onPress={() =>
              navigation.navigate('Login', {role: UserRoles.DISTRIBUTOR})
            }>
            <Text style={Style.cardText}>DISTRIBUTOR</Text>
            <Image
              source={logoFirst}
              style={Style.cardIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={Style.cardContainer}>
          <TouchableOpacity
            style={Style.card}
            onPress={() =>
              navigation.navigate('Login', {role: UserRoles.RETAILER})
            }>
            <Text style={Style.cardText}>RETAILER</Text>
            <Image
              source={saleTeam}
              style={Style.cardIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={Style.cardContainer}>
          <TouchableOpacity
            style={Style.card}
            onPress={() =>
              navigation.navigate('Login', {role: UserRoles.SALES_TEAM})
            }>
            <Text style={Style.cardText}>SALES TEAM</Text>
            <Image
              source={logoReatailer}
              style={Style.cardIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Onboard;
