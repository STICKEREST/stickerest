import { createStackNavigator } from '@react-navigation/stack';

import { TabNavigator } from './TabNavigator';
import { SingleSticker } from './pages/stickers/SingleSticker';

import Login_page from './pages/Login_page';
import Registration_page from './pages/Registration_page';

import React from 'react';


const Stack = createStackNavigator();

export const StackNavigator = () => (
	<Stack.Navigator screenOptions={{headerTransparent: true, headerTitle: '', headerTintColor: 'white'}} >
		<Stack.Screen name="LoginPage" component={Login_page} />
		<Stack.Screen name="SignInPage" component={Registration_page} />
		<Stack.Screen name="TabNavigator" component={TabNavigator} />
		<Stack.Screen name="SingleSticker" component={SingleSticker} />
	</Stack.Navigator>
);
