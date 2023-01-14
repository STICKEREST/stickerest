import React from 'react'
import { Dimensions, ImageBackground,  ImageSourcePropType,  TouchableHighlight  } from 'react-native';
import { Text, View, Image, TouchableOpacity } from 'react-native';

// import { useFonts } from 'expo-font';

import { styleSingleSticker } from "../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../assets/ImagesAssets';


export const BigStickerPack = ({img, title}:{img : string, title : string}) => {
  
  // const [fontsLoaded] = useFonts({
  //   'poppins': require('../../assets/fonts/poppins/Poppins-Bold.otf')
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
      <View style={[styleSingleSticker.mainStickerView, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 }]} >
          <View style={{flex: 1}}>
              <Image source={{uri: img}} style={{height:100, width: 110}}/>
          </View>

          <View style={{flex: 1}}>
              <Text style={{fontFamily: "poppins", fontSize: 24, color: 'white'}}>{title}</Text>
          </View>
      </View>
  );
}
