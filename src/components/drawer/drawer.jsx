import React from 'react';
import {
  View,
  Text,
  Switch,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import UserLogo from 'assets/images/user.png';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/slice/authSlice';
import {useSelector} from 'react-redux';
import Style from './style';
// import {
//   User2,
//   Clock,
//   Gift,
//   FileText,
//   ImageIcon,
//   Tag,
//   HelpCircle,
//   Trash2,
//   Info,
//   Shield,
//   FileSignature,
//   LogOut,
// } from 'lucide-react-native';

// navigation now comes from props
const DrawerMenu = ({
  navigation,
  togglePush = false,
  onTogglePush = () => {},
}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const handleLogout = () => {
    dispatch(logout()); // clear auth state
  };
  const MenuItem = ({label, Icon, screen}) => (
    <Pressable style={Style.item} onPress={() => navigation.navigate(screen)}>
      {/* <Icon size={22} strokeWidth={1.8} color="#000" /> */}
      <Text style={Style.label}>{label}</Text>
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
          <MenuItem label="My Profile" screen="RewardHistory" />
          <MenuItem label="Scan History" screen="ScanHistory" />
          <MenuItem label="Reward History" screen="RewardHistory" />
          <MenuItem label="Scheme" screen="Scheme" />
          <MenuItem label="Catalogue" screen="RewardHistory" />
          <MenuItem label="Media" screen="RewardHistory" />

          <MenuItem label="Contact Us" screen="RewardHistory" />
          <MenuItem label="How it Works" screen="RewardHistory" />

          {/* Other section */}
          <Text style={Style.section}>OTHER</Text>
          <MenuItem label="About Ticketis" screen="RewardHistory" />
          <MenuItem label="Privacy Policy" screen="RewardHistory" />
          <MenuItem label="Terms and Conditions" screen="RewardHistory" />

          {/* Push notification toggle */}
          <View style={[Style.item, {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Shield size={22} strokeWidth={1.8} color="#000" /> */}
              <Text style={Style.label}>Push Notification</Text>
            </View>
            <Switch value={togglePush} onValueChange={onTogglePush} />
          </View>
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
