
import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import{ ImagesAssets } from './assets/ImagesAssets';

import CreatePack from './components/pages/creationPages/createPack';


            //                    code\components\Loading_page.tsx
            //                    ./components/pages/homepage/Homepage
            //import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './components/subcomponents/TabNavigator';

import { TagInput } from './components/subcomponents/tags-input/TagInput';


export default function App() {
  return (
    <View>
      <CreatePack/>
    </View>
  );
}
