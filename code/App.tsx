import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import{ ImagesAssets } from './assets/ImagesAssets';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    'popblack': require('./assets/fonts/poppins/popblack.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: "popblack",
    color: 'white',
    fontSize: 40,
  },
  text_view: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  logo : {
    width: 150,
    height: 150, 
    marginTop: -100,
    marginBottom: 10
  }
});
