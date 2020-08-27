import React from 'react';
import 'react-native-gesture-handler';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { configureStore } from './store';

import Navigator from './nav/navigator';

const store = configureStore();

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
