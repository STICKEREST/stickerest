import React, { useEffect, useState } from 'react';

<<<<<<< HEAD
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './components/StackNavigator';
=======
import Homepage from './components/pages/Homepage';
import { View } from 'react-native';
// import H from './components/pages/discovery/DiscoveryPage';
// import Homepage from './components/pages/Homepage';
>>>>>>> 15-make-the-homepage-functional

import Login_page from './components/pages/Login_page';
import Loading_page from './components/pages/Loading_page';

export default function App() {
<<<<<<< HEAD

	const [ready, setReady] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false); // TODO: Simulates the user being logged in or not, change this when actual login is implemented
	useEffect(() => {
		async function load() {
			try {
				// TODO: This waits for 5 seconds, the loading should be done here
				await new Promise(resolve => setTimeout(resolve, 5000));
			} catch(e) {
				console.warn(e);
			} finally {
				setReady(true);
			}
		}
		load();
	});
	return ready ? loggedIn ? (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	) : (
		<Login_page />
	) : (
		<Loading_page />
=======
	return (
		<View>
			{/* <TabNavigator /> */}
			<Homepage />
		</View>
>>>>>>> 15-make-the-homepage-functional
	);

}
