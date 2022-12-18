import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import Login_page from './components/pages/Login_page';
import Registration_page from './components/pages/Registration_page';
import { View } from 'react-native';


export default function App() {
	return (
		<View>
			<Login_page/>
		</View>
	);
}
