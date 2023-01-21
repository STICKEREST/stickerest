import React from 'react'
import { Dimensions, ImageBackground,  ImageSourcePropType,  TouchableHighlight  } from 'react-native';
import { Text, View, Image, TouchableOpacity } from 'react-native';

// import { useFonts } from 'expo-font';

import { styleSingleSticker } from "../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../assets/ImagesAssets';

const SmallStickerPackBox = ({img, smaller = false} : {img : string, smaller ? : boolean}) => {

    return (
          <View style={[smaller ? styleSingleSticker.smallerStickerView  : styleSingleSticker.stickerView, {alignItems: 'center', justifyContent: 'center'}]}>
              <Image source={{uri: img}} style={{height: 75, width: 75}} />
          </View>
      );

}


const SmallStickerPack = ({img, title, download}:{img : string, title : string, download : number}) => {
  

  return (
    <View >
        <SmallStickerPackBox img={img} />
        <Text style={{fontFamily: "popblack", fontSize: 15, marginTop: 8}}>{title}</Text>
        <Text style={{fontFamily: "poplight", fontSize: 12, marginTop: 4}} >{download} download</Text>
    </View>
  );
}

export {SmallStickerPack, SmallStickerPackBox};
