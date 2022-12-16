import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

import { ImagesAssets } from '../assets/ImagesAssets';

import { Homepage } from './pages/Homepage';
import DiscoveryPage from './pages/discovery/DiscoveryPage';
import UserProfilePage from './pages/UserProfilePage';
import CreatePack from './pages/creationPages/createPack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tabs = createBottomTabNavigator();

// Handles the navigation between Homepage, Favourites, CreatePack, DiscoveryPage, UserProfilePage.
// Homepage then uses the StackNavigator to control the navigation between this TabNavigator and the SingleSticker page.
export const TabNavigator = () => (
	<Tabs.Navigator screenOptions={{headerShown: false}} tabBar={Navbar} >
		<Tabs.Screen name="Homepage" component={Homepage} initialParams={{icon: ImagesAssets.iconHome}} />
		<Tabs.Screen name="Favourites" component={View} initialParams={{icon: ImagesAssets.iconStar}} />
		<Tabs.Screen name="CreatePack" component={CreatePack} initialParams={{icon: ImagesAssets.iconDocument}} />
		<Tabs.Screen name="DiscoveryPage" component={DiscoveryPage} initialParams={{icon: ImagesAssets.iconSettings}} />
		<Tabs.Screen name="UserProfilePage" component={UserProfilePage} initialParams={{icon: ImagesAssets.iconUser}} />
	</Tabs.Navigator>
);

// Navbar defines the appearance of the bottom navigation bar
const Navbar = ({state, descriptors, navigation}) => (
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
