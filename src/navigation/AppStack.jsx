import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from 'screens/App/dashboard/Dashboard';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
