import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './components/StackNavigator';


export default function App() {
	return (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	);
}
