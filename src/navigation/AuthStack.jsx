import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from 'screens/Auth/login/Login';
import MPINScreen from 'screens/Auth/mpin/MPIN';
import Onboard from 'screens/Auth/onboard/Onboard';
import ForgotPassword from 'screens/Auth/forgotPassword/ForgotPassword';
import Registration from 'screens/Auth/registration/Registration';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="MPIN" component={MPINScreen} />
    </Stack.Navigator>
  );
}
