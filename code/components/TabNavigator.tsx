import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ImagesAssets } from '../assets/ImagesAssets';

import Homepage from './pages/Homepage';
import DiscoveryPage from './pages/discovery/DiscoveryPage';
import UserProfilePage from './pages/UserProfilePage';
import CreatePack from './pages/creationPages/createPack';

const Tabs = createBottomTabNavigator();

// TabNavigator component needs to be inside a NavigationContainer tag and it wraps the whole app.
export default function TabNavigator() {
	// The 'component' parameter for each screen is the component rendered on that screen.
	// 'initialParams' is used to pass params to the navigation route.
	return (
		<Tabs.Navigator screenOptions={{headerShown: false}} tabBar={Navbar} >
			<Tabs.Screen name="Home" component={Homepage} initialParams={{icon: ImagesAssets.iconHome}} />
			<Tabs.Screen name="View" component={View} initialParams={{icon: ImagesAssets.iconStar}} />
			<Tabs.Screen name="Create" component={CreatePack} initialParams={{icon: ImagesAssets.iconDocument}} />
			<Tabs.Screen name="Discovery" component={DiscoveryPage} initialParams={{icon: ImagesAssets.iconSettings}} />
			<Tabs.Screen name="User" component={UserProfilePage} initialParams={{icon: ImagesAssets.iconUser}} />
		</Tabs.Navigator>
	);
}

// Navbar defines the appearance of the bottom navigation bar
function Navbar({state, descriptors, navigation}) {
	return (
		<View style={navbarStyles.background}>
			{
				state.routes.map((route, index) => {
					const buttons = state.routes.length;
					const middleButton = (buttons % 2 === 0 ? buttons : buttons - 1) / 2;
					const navigate = () => {
						navigation.navigate({
							name: route.name,
							merge: true
						});
					}
					return index === middleButton ? (
						<View style={navbarStyles.circleButton} key={index}>
							<TouchableOpacity onPress={navigate}>
								<Image source={route.params.icon} style={{alignSelf: "center"}} />
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity style={navbarStyles.expand} onPress={navigate} key={index}>
							<Image source={route.params.icon} style={{alignSelf: "center"}} />
						</TouchableOpacity>
					);
				})
			}
		</View>
	);
}

const navbarStyles = StyleSheet.create({
	background: {
		position: "absolute",
		bottom: 0,
		flexDirection: "row",
		backgroundColor: "#f5cb08",
		paddingBottom: 15,
		paddingTop: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	},
	expand: {
		flexBasis: "auto",
		flexGrow: 1,
		flexShrink: 0
	},
	circleButton: {
		backgroundColor: "#f5cb08",
		paddingTop: 15,
		marginTop: -60,
		height: 90,
		width: 90,
		borderRadius: 90,
		shadowOffset: {
			width: 0,
			height: 2
		},
		elevation: 5
	}
});
