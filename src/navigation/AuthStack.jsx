import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/login/Login';
import MPINScreen from 'screens/Auth/mpin/MPIN';
import Onboard from 'screens/Auth/onboard/Onboard';
import NewRegistration from '/screens/Auth/newRegistration/NewRegistration';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="NewRegistration" component={NewRegistration} />
      <Stack.Screen name="MPIN" component={MPINScreen} />
    </Stack.Navigator>
  );
}
