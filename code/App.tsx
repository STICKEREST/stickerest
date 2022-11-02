import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';

import{ ImagesAssets } from './assets/ImagesAssets';

export default function App() {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <Image style={{height: windowHeight, width: windowWidth}} source={ImagesAssets.bannerList1}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
