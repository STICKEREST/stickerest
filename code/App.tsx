import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import Login_page from './components/pages/Login_page';
import Registration_page from './components/pages/Registration_page';


export default function App() {
	return (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	);
}
