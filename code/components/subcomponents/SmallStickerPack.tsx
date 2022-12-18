import React from 'react'
import { Dimensions, ImageBackground,  ImageSourcePropType,  TouchableHighlight  } from 'react-native';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';

import { styleSingleSticker } from "../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../assets/ImagesAssets';

const SmallStickerPackBox = ({img, onPress} : {img : ImageSourcePropType, onPress: () => void}) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styleSingleSticker.stickerView, {alignItems: 'center', justifyContent: 'center'}]}>
                <Image source={img} style={{height: 70, width: 90}} />
            </View>
        </TouchableOpacity>
      );

}


const SmallStickerPack = ({img, title, download}:{img : ImageSourcePropType, title : string, download : number}) => {
  
  const [fontsLoaded] = useFonts({
    'poplight': require('./../../assets/fonts/poppins/Poppins-Light.otf'),
    'popblack': require('./../../assets/fonts/poppins/Poppins-Bold.otf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View >
        <SmallStickerPackBox img={img} />
        <Text style={{fontFamily: "popblack", fontSize: 15, marginTop: 8}}>{title}</Text>
        <Text style={{fontFamily: "poplight", fontSize: 12, marginTop: 4}} >{download} download</Text>
    </View>
  );
}

export {SmallStickerPack, SmallStickerPackBox};
