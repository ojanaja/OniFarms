import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ApplicationNavigators from './src/navigators/ApplicationNavigators';
import { Provider } from 'react-redux';
import configureStore from './src/store';
import { loadAlarms } from './src/actions/alarms';
import { SheetProvider } from 'react-native-actions-sheet';

const store = configureStore();

const App = () => {

  useEffect(() => {
    store.dispatch(loadAlarms());
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SheetProvider>
          <ApplicationNavigators />
        </SheetProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
