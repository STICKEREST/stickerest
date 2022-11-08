import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "../style";

import{ ImagesAssets } from '../assets/ImagesAssets';

export default function Login_page() {
  
  const [fontsLoaded] = useFonts({
    'popblack': require('../assets/fonts/poppins/popblack.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
        <ImageBackground source={ImagesAssets.bannerList2} style={{height: windowHeight, width: windowWidth}}>
            <View style={styles.text_view_login}>
                <Text style={[styles.textLogin, {paddingTop: windowHeight/4.5}]}>Log in to your Account</Text>
            </View>
        </ImageBackground>
    </View>
  );
}
