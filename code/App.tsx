import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import { View } from 'react-native';
import Login_page from './components/pages/Login_page';
import Loading_page from './components/pages/Loading_page';
import Registration_page from './components/pages/Registration_page';

export default function App() {
	return (
      <View><Login_page/></View>
	);
}
