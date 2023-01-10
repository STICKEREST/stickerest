import { createStackNavigator } from '@react-navigation/stack';

import { TabNavigator } from './TabNavigator';
import { SingleSticker } from './pages/stickers/SingleSticker';

import Login_page from './pages/Login_page';
import Registration_page from './pages/Registration_page';


const Stack1 = createStackNavigator();
const Stack2 = createStackNavigator();

/**
 * StackNavigator that handles navigation between the main app page and the single sticker page.
 */
export const AppNavigator = () => (
	<Stack1.Navigator screenOptions={{headerTransparent: true, headerTitle: '', headerTintColor: 'white'}} >
		<Stack1.Screen name="TabNavigator" component={TabNavigator} />
		<Stack1.Screen name="SingleSticker" component={SingleSticker} />
	</Stack1.Navigator>
);

/**
 * StackNavigator that handles navigation between the login and the sign in pages.
 */
export const LoginNavigator = () => (
	<Stack2.Navigator screenOptions={{headerTransparent: true, headerTitle: '', headerTintColor: 'white'}} >
		<Stack2.Screen name="LoginPage" component={Login_page} />
		<Stack2.Screen name="SignInPage" component={Registration_page} />
	</Stack2.Navigator>
);
