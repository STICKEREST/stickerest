import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import Registration_page from './components/pages/Registration_page';

export default function App() {
	return (
		<View><Registration_page/></View>
	);
}
