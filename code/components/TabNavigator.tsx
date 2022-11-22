import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ImagesAssets } from '../assets/ImagesAssets';

import Navbar from './Navbar';

const Tabs = createBottomTabNavigator();

// TabNavigator component needs to be inside a NavigationContainer tag and it wraps the whole app.
// The 'component' parameter for each screen is the component rendered on that screen.
// 'initialParams' is used to pass params to the navigation route.
export default function TabNavigator() {
	return (
		<Tabs.Navigator screenOptions={{headerShown: true}} tabBar={Navbar} >
			<Tabs.Screen name="Home" component={View} initialParams={{icon: ImagesAssets.iconHome}} />
			<Tabs.Screen name="Favourites" component={View} initialParams={{icon: ImagesAssets.iconStar}} />
			<Tabs.Screen name="Add" component={View} initialParams={{icon: ImagesAssets.iconDocument}} />
			<Tabs.Screen name="Settings" component={View} initialParams={{icon: ImagesAssets.iconSettings}} />
			<Tabs.Screen name="User" component={View} initialParams={{icon: ImagesAssets.iconUser}} />
		</Tabs.Navigator>
	);
}
