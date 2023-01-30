import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './navigation/StackNavigator';

import Loading_page from './components/homepage/LoadingPage';

import * as Font from 'expo-font';

export default function App() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    async function load() {
      try {
        // Async loading of fonts
        await Font.loadAsync({
          'popblack': require('./assets/fonts/poppins/popblack.otf'),
          'poplight': require('./assets/fonts/poppins/Poppins-Light.otf'),
          'popbold': require('./assets/fonts/poppins/Poppins-Bold.otf'),
          'popregular': require('./assets/fonts/poppins/Poppins-Regular.otf')
        });
        // Keep loading page visible for at least 2,5 second
        await new Promise(resolve => setTimeout(resolve, 2500));
      } catch(e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }
    load();
  });
  return ready ? (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  ) : (
    <Loading_page />
  );
}
