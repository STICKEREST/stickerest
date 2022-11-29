import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './components/TabNavigator';
import Registration_page from './components/pages/Registration_page';
import Loading_page from './components/pages/Loading_page';
import Login_page from './components/pages/Login_page';
import User_page from './components/pages/UserProfilePage';


export default function App() {
	return (
		<View><User_page/></View>
	);
}
