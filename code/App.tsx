import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';

import Loading_page from './components/Loading_page';
import Login_page from './components/Login_page';

import { useFonts } from 'expo-font';

import{ ImagesAssets } from './assets/ImagesAssets';

import SingleSticker from './components/pages/stickers/SingleSticker';

export default function App() {

  return (
    <View>
        <SingleSticker/>
    </View>
  );
  
}
