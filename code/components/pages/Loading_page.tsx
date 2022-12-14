import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "./../../assets/style/styleLoadingPage";

import{ ImagesAssets } from './../../assets/ImagesAssets';

export default function Homepage() {
 
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
        <ImageBackground source={ImagesAssets.bannerList1} style={{height: windowHeight, width: windowWidth}}>
            <View style={styles.text_view}>
                <Image style={styles.logo} source={ImagesAssets.logo}/>
                <Text style={styles.text}>SticKerest</Text>
            </View>
        </ImageBackground>
    </View>
  );
}
