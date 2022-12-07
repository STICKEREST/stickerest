import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';

import Loading_page from './components/pages/Loading_page';

export default function App() {
	const [ready, setReady] = useState(false);
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
	// TODO: Use more than just one 'ready' state to show either Loading, Login, or TabNavigator
	return ready ? (
		<NavigationContainer>
			<TabNavigator />
		</NavigationContainer>
	) : <Loading_page />;
}
