import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';

export default function App() {
	return (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	);
}
