import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ApplicationNavigators from './src/navigators/ApplicationNavigators';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ApplicationNavigators />
    </GestureHandlerRootView>
  );
};

export default App;
