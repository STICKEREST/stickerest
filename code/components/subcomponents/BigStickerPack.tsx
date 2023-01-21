import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native';

import { styleSingleSticker } from "../../assets/style/styleSingleSticker";


export const BigStickerPack = ({img, title}:{img : string, title : string}) => {

  return (
      <View style={[styleSingleSticker.mainStickerView, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 }]} >
          <View style={{flex: 1}}>
              <Image source={{uri: img}} style={{height:100, width: 110}}/>
          </View>

          <View style={{flex: 1}}>
              <Text style={{fontFamily: "popblack", fontSize: 24, color: 'white'}}>{title}</Text>
          </View>
      </View>
  );
}
