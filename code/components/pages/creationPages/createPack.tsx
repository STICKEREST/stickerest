import React, { useState } from 'react'
import { Dimensions, ImageBackground,  TextInput, Button, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import { ImagesAssets } from '../../../assets/ImagesAssets';
import {TagInput} from '../../subcomponents/tags-input/TagInput'
import { SmallStickerPackBox } from "../../subcomponents/SmallStickerPack";
import { styleTagInput } from '../../../assets/style/styleTagInput';


export default function CreatePack() {
  
  const [fontsLoaded] = useFonts({
    'popblack': require('../../../assets/fonts/poppins/popblack.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const UploadButton = () => {
    return (
        <View>
            <TouchableOpacity  style={{backgroundColor: '#8D08F5', paddingTop: 8, paddingBottom: 8, borderRadius: 20, width: 160}}>
                <Text style={{color: 'white', fontFamily: 'poplight', fontSize: 16, textAlign:"center"}}>Upload Pack</Text>
            </TouchableOpacity>
        </View>
    )
}

const StickersPreview = () => {
  return (
  <View>
    <View style={{marginTop: 20, flexDirection: 'row'}}>
                <View style={{marginRight: 4}}>
                    <SmallStickerPackBox img={ImagesAssets.computer} />
                </View>
                <View style={{marginRight: 4}}>
                    <SmallStickerPackBox img={ImagesAssets.computer}/>
                </View>
                <View style={{marginRight: 4}}>
                    <SmallStickerPackBox img={ImagesAssets.computer}/>
                </View>
    </View>
    <View style={{marginTop: 20, flexDirection: 'row'}}>
                <View style={{marginRight: 4}}>
                    <SmallStickerPackBox img={ImagesAssets.computer} />
                </View>
                <View style={{marginRight: 4}}>
                    <SmallStickerPackBox img={ImagesAssets.computer}/>
                </View>
                <View style={{marginRight: 4}}>
                    <SmallStickerPackBox img={ImagesAssets.computer}/>
                </View>
    </View>
    <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
      <UploadButton />
    </View>
  </View>
  );
}
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styleCreatePack.container}>
        <View>
            <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
        </View>
        <View>
            <Text style= {{fontFamily: "popbold", fontSize: 19, alignContent: 'stretch'}}>Add your sticker pack</Text>
            <TextInput
                //onChangeText={onChangeText}
                placeholder={"Add a name pack"}
              />   
            <Text style= {{fontFamily: "popbold", fontSize: 19, alignContent: 'stretch'}}>Tags</Text> 
            <TagInput/>
            <Text style= {{fontFamily: "popbold", fontSize: 19, alignContent: 'stretch'}}>Stickers</Text>
            
        </View>
        <StickersPreview/>
    </View>
  );
}
