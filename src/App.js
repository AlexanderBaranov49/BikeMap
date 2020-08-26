import React from 'react';
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { configureStore } from './store';

import Navigator from './nav/navigator';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
