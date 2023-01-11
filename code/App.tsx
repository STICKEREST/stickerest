import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './components/StackNavigator';

import Login_page from './components/pages/Login_page';
import Loading_page from './components/pages/Loading_page';
import { View } from 'react-native';
import {Homepage} from './components/pages/Homepage';
import Registration_page from './components/pages/Registration_page';
import {SingleSticker} from './components/pages/stickers/SingleSticker';
import UserProfilePage from './components/pages/UserProfilePage';
import CreatePack from './components/pages/creationPages/createPack';
import DiscoveryPage from './components/pages/discovery/DiscoveryPage';

export default function App() {
	
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
	);

	// return (
	// 	<View>
	// 		<UserProfilePage />
	// 	</View>
	// )
		
}
