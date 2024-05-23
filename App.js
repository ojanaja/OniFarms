import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ApplicationNavigators from './src/navigators/ApplicationNavigators';
import { Provider } from 'react-redux';
import configureStore from './src/store';
const store = configureStore();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ApplicationNavigators />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
