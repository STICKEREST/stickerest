import { createStackNavigator } from '@react-navigation/stack';

import { TabNavigator } from './TabNavigator';
import { SingleSticker } from '../components/pages/stickers/SingleSticker';

import LoginPage from '../components/access/LoginPage';
import RegistrationPage from '../components/access/RegistrationPage';

import React from 'react';


const Stack = createStackNavigator();

export const StackNavigator = () => (
	<Stack.Navigator screenOptions={{headerTransparent: true, headerTitle: '', headerTintColor: 'white'}} >
		<Stack.Screen name="LoginPage" component={LoginPage} />
		<Stack.Screen name="SignInPage" component={RegistrationPage} />
		<Stack.Screen name="TabNavigator" component={TabNavigator} />
		<Stack.Screen name="SingleSticker" component={SingleSticker} />
	</Stack.Navigator>
);
