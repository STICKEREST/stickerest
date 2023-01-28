import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { Text, View, Image } from 'react-native';

import { styles } from '../styles/Styles';
import { loadingPageStyle } from '../styles/LoadingPage';

import{ ImagesAssets } from '../assets/img/ImagesAssets';

export default function LoadingPage() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.center}>
      <ImageBackground source={ImagesAssets.bannerList1} style={{height: windowHeight, width: windowWidth}} >
        <View style={loadingPageStyle.textView} >
          <Image style={loadingPageStyle.logo} source={ImagesAssets.logo} />
          <Text style={loadingPageStyle.text}>SticKerest</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
