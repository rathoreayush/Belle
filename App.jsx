import RootNavigator from 'navigation/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/toastMessage';
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
