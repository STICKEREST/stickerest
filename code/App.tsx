import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

//FOR TESTING PURPOSES:
//import SingleSticker from './components/pages/stickers/SingleSticker';
import Loading_page from './components/pages/Loading_page';
import Login_page from './components/pages/Login_page';
import UserProfilePage from './components/pages/UserProfilePage';
import DicoveryPage from './components/pages/discovery/DiscoveryPage';
import Registration_page from './components/pages/Registration_page';

export default function App() {
	return (
      <View><UserProfilePage/></View>
	);
}
