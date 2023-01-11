import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './components/StackNavigator';

import Loading_page from './components/pages/Loading_page';

import { useFonts } from 'expo-font';

export default function App() {
	const [fontsLoaded] = useFonts({
		'popblack': require('./assets/fonts/poppins/popblack.otf'),
		'poplight': require('./assets/fonts/poppins/Poppins-Light.otf'),
		'popregular': require('./assets/fonts/poppins/Poppins-Regular.otf')
	});
	return fontsLoaded ? (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	) : (
		<Loading_page />
	);
}
