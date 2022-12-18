import React from 'react'
import { Dimensions, ImageBackground,  ImageSourcePropType,  TouchableHighlight  } from 'react-native';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';

import { styleSingleSticker } from "../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../assets/ImagesAssets';


export const BigStickerPack = ({img, title, onPress}:{img : ImageSourcePropType, title : string, onPress: () => void}) => {
  
  const [fontsLoaded] = useFonts({
    'poppins': require('../../assets/fonts/poppins/Poppins-Bold.otf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} >
        <View style={[styleSingleSticker.mainStickerView, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 }]} >
            <View style={{flex: 1}}>
                <Image source={img} />
            </View>

            <View style={{flex: 1}}>
                <Text style={{fontFamily: "poppins", fontSize: 24, color: 'white'}}>{title}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
}
