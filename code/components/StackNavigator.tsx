
import { TabNavigator } from './TabNavigator';
import { SingleSticker } from './pages/stickers/SingleSticker';

import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


// Handles the navigation between the TabNavigator and the SingleSticker page.
// The TabNavigator then handles the navigation between Homepage, Discovery, etc.
export const StackNavigator = () => (
	<Stack.Navigator screenOptions={{headerTransparent: true, headerTitle: '', headerTintColor: 'white'}} >
		<Stack.Screen name="TabNavigator" component={TabNavigator} />
		<Stack.Screen name="SingleSticker" component={SingleSticker} />
	</Stack.Navigator>
);
