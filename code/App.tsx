import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';

import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { StyleSheet, Text, View, Image } from 'react-native';

import Loading_page from './components/Loading_page';

import { useFonts } from 'expo-font';

import{ ImagesAssets } from './assets/ImagesAssets';

import SingleSticker from './components/pages/stickers/SingleSticker';

import CreatePack from './components/pages/creationPages/createPack';

import BigStickerCarousel from './components/subcomponents/stickers-carousel/CarouselBigSticker';

import StickerCarousel from './components/subcomponents/stickers-carousel/CarouselSticker';

import HomePage from './components/pages/homepage/Homepage';

            //                    code\components\Loading_page.tsx
            //                    ./components/pages/homepage/Homepage
            //import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from './components/subcomponents/TabNavigator';

import Carousel from './components/subcomponents/stickers-carousel/CarouselBigSticker';

/*
  import React from 'react'

  import { NavigationContainer } from '@react-navigation/native';
  import TabNavigator from './components/TabNavigator';

  export default function App() {
    return (
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    );
  }
*/

export default function App() {

  return (
    <View>
      <CreatePack/>
    </View>
  );
}
