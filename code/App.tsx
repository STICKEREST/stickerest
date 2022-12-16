import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import Login_page from './components/pages/Login_page';

import { Test } from './api/Telegram';


export default function App() {
	return (
		<NavigationContainer>
			<Test />
		</NavigationContainer>
	);
}
