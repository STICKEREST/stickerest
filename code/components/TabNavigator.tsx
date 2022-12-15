import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ImagesAssets } from '../assets/ImagesAssets';

import Homepage from './pages/Homepage';
import Favorites from './pages/Favorites';
import Discovery from './pages/discovery/DiscoveryPage';
import UserProfilePage from './pages/UserProfilePage';
import CreatePack from './pages/creationPages/createPack';

import Navbar from './Navbar';

const Tabs = createBottomTabNavigator();

// TabNavigator component needs to be inside a NavigationContainer tag and it wraps the whole app.
export default function TabNavigator() {
	// The 'component' parameter for each screen is the component rendered on that screen.
	// 'initialParams' is used to pass params to the navigation route.
	return (
		<Tabs.Navigator screenOptions={{headerShown: false}} tabBar={Navbar} >
			<Tabs.Screen name="Home" component={Homepage} initialParams={{icon: ImagesAssets.iconHome}} />
			<Tabs.Screen name="Discovery" component={Discovery} initialParams={{icon: ImagesAssets.iconStar}} />
			<Tabs.Screen name="Create" component={CreatePack} initialParams={{icon: ImagesAssets.iconDocument}} />
			<Tabs.Screen name="Settings" component={View} initialParams={{icon: ImagesAssets.iconSettings}} />
			<Tabs.Screen name="User" component={UserProfilePage} initialParams={{icon: ImagesAssets.iconUser}} />
		</Tabs.Navigator>
	);
}
