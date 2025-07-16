import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerMenu from 'components/drawer/drawer';
import Dashboard from 'screens/App/dashboard/Dashboard';
import RewardHistory from 'screens/App/rewardHistory/RewardHistory';
import Scanner from 'screens/App/scanner/Scanner';
import ScanHistory from 'screens/App/scanHistory/ScanHistory';
import Scheme from 'screens/App/scheme/Scheme';
import Profile from 'screens/App/profile/Profile';
import RedeemPoint from '../screens/App/redeemPoint/RedeemPoint';
import Catalogue from '../screens/App/catalogue/Catalogue';
import ComingSoonScreen from '../screens/App/commingsoon/CommingSoon';
import ReportIssue from '../screens/App/reportissue/ReportIssue';

const Drawer = createDrawerNavigator();

export default function AppStack() {
  return (
    <Drawer.Navigator
      backBehavior="history"
      drawerContent={props => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false, // show header on every screen
        drawerActiveBackgroundColor: '#e6f0ff', // pick a color ‑ must be a string
        headerShadowVisible: false,
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="RewardHistory" component={RewardHistory} />
      <Drawer.Screen name="Scanner" component={Scanner} />
      <Drawer.Screen name="ScanHistory" component={ScanHistory} />
      <Drawer.Screen name="Scheme" component={Scheme} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="RedeemPoint" component={RedeemPoint} />
      <Drawer.Screen name="Catalogue" component={Catalogue} />
      <Drawer.Screen name="ComingSoonScreen" component={ComingSoonScreen} />
      <Drawer.Screen name="ReportIssue" component={ReportIssue} />
    </Drawer.Navigator>
  );
}
