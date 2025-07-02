import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import UserLogo from 'assets/images/user.png';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slice/authSlice';
import {useSelector} from 'react-redux';
import Style from './style';
import ProfileLogo from 'assets/images/drawer7.png';
import ScanLogo from 'assets/images/scanhistory.png';
import RewardLogo from 'assets/images/drawerreward.png';
import SchemeLogo from 'assets/images/drawer4.png';
import CatLogo from 'assets/images/drawer3.png';
import MediaLogo from 'assets/images/drawermedia.png';
import ContactLogo from 'assets/images/drawercontact.png';
import HowLogo from 'assets/images/howit.png';
import backLogo from 'assets/images/back-arrow.png';
import {UserRoles} from '../../constants/role';
// navigation now comes from props
const DrawerMenu = ({
  navigation,
  // togglePush = false,
  // onTogglePush = () => {},
}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // clear auth state
  };
  const MenuItem = ({label, Icon, screen}) => (
    <Pressable style={Style.item} onPress={() => navigation.navigate(screen)}>
      <View style={Style.profileContainer}>
        <Image source={Icon} style={Style.icon} />
        <Text style={Style.label}>{label}</Text>
      </View>
      <View>
        <Image source={backLogo} style={Style.backIcon} />
      </View>
    </Pressable>
  );

  return (
    <DrawerContentScrollView contentContainerStyle={Style.container}>
      {/* Header */}
      <View style={Style.header}>
        <View style={Style.userContainer}>
          <Image source={UserLogo} style={Style.logo} />
          <Text style={Style.nameText}>{user?.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={Style.closeBtn}>
          <Text style={Style.closeTxt}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Primary menu */}
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={Style.primaryMenuContainer}>
        <View style={Style.itemContainer}>
          <MenuItem
            label="My Profile"
            screen="RewardHistory"
            Icon={ProfileLogo}
          />
          {(user?.role_id === UserRoles.DISTRIBUTOR ||
            user?.role_id === UserRoles.RETAILER) && (
            <>
              <MenuItem
                label="Scan History"
                screen="ScanHistory"
                Icon={ScanLogo}
              />
              <MenuItem
                label="Reward History"
                screen="RewardHistory"
                Icon={RewardLogo}
              />
            </>
          )}
          <MenuItem label="Scheme" screen="Scheme" Icon={SchemeLogo} />
          <MenuItem label="Catalogue" screen="Catalogue" Icon={CatLogo} />
          <MenuItem label="Media" screen="RewardHistory" Icon={MediaLogo} />

          <MenuItem
            label="Contact Us"
            screen="RewardHistory"
            Icon={ContactLogo}
          />
          <MenuItem
            label="How it Works"
            screen="RewardHistory"
            Icon={HowLogo}
          />

          {/* Other section */}
          <Text style={Style.section}>OTHER</Text>

          <MenuItem label="Privacy Policy" screen="RewardHistory" />
          <MenuItem label="Terms and Conditions" screen="RewardHistory" />

          {/* Push notification toggle */}
          {/* <View style={[Style.item, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Shield size={22} strokeWidth={1.8} color="#000" />
              <Text style={Style.label}>Push Notification</Text>
            </View>
            <Switch value={togglePush} onValueChange={onTogglePush} />
          </View> */}
          {/* Sign‑out button */}
          <Pressable style={Style.signOut} onPress={handleLogout}>
            {/* <LogOut size={20} color="#fff" style={{marginRight: 6}} /> */}
            <Text style={Style.signOutTxt}>Sign Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </DrawerContentScrollView>
  );
};

export default DrawerMenu;
