import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { TabNavigator } from './TabNavigator';
import { SingleSticker } from '../UI/components/stickers/SingleStickerPage';

import LoginPage from '../UI/components/access/LoginPage';
import RegistrationPage from '../UI/components/access/RegistrationPage';


const Stack = createStackNavigator();

/**
 * Handles stack navigation in the app.
 * Constains a useState to determine when the user is logged in.
 * When the user is logged in, show the stack navigator containing the TabNavigator and the SingleSticker page.
 * When the user is not logged in, show the stack navigator containing the Login page and the Registration page.
 */
export const StackNavigator = () => {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const Login = () => (<LoginPage setLoggedIn={setLoggedIn} />);
  const SignUp = () => (<RegistrationPage />);
  return loggedIn ? (
    <Stack.Navigator screenOptions={{headerTransparent: true, headerTitle: '', headerTintColor: 'white'}} >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="SingleSticker" component={SingleSticker} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="LoginPage" component={Login} />
      <Stack.Screen name="SignUpPage" component={SignUp} />
    </Stack.Navigator>
  );
}
