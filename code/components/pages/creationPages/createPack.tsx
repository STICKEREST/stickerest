import React, { useCallback, useState } from 'react'
import { Dimensions, ImageBackground, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import { ImagesAssets } from '../../../assets/ImagesAssets';
import {TagInput} from '../../subcomponents/tags-input/TagInput'
import { SmallStickerPackBox } from "../../subcomponents/SmallStickerPack";
import { FlexibleAlbum} from "../../subcomponents/stickers-carousel/FlexibleAlbum";
import ImageImport from '../../subcomponents/imagePicker/ImageImport';

  // BUG: Se viene inserito come ultimo tag un tag ripetuto va comunque a inficiare sull'availability dell'input

let gray = '#f1f1f1'
let purple = '#8D08F5'
const windowWidth = Dimensions.get('window').width;
const windowtHeight = Dimensions.get('window').height;

const UploadButton = () => {
  return (
      <View style = {{}}>
          <TouchableOpacity  style={{backgroundColor: purple, paddingTop: 8, paddingBottom: 8, borderRadius: 20, width: windowWidth*0.4}}>
              <Text style={{color: 'white', fontSize: 16, textAlign:"center"}}>Upload Pack</Text>
          </TouchableOpacity>
      </View>
  )
}

const StickersPreview = () => {
return (
  <View  style={{height: windowtHeight*0.325, alignContent: 'center'}}>
    <ImageImport/>
    <View style={{alignItems: 'center'}}>
    <UploadButton/>
    </View>
    
  </View>
);
}

const StickerNameInput = () => {
  return (
  <View style={[styleCreatePack.inputs, {backgroundColor: gray}]}>
              <TextInput
                style={[styleCreatePack.input, {width: windowWidth*0.7}]}
                
                placeholder={"Add a name pack"}
              />
       </View>
  );
}

export default function CreatePack() {

  const [fontsLoaded] = useFonts({
    'popblack': require('../../../assets/fonts/poppins/popblack.otf'),
    'poplight': require('../../../assets/fonts/poppins/Poppins-Light.otf'),
    'popregular': require('../../../assets/fonts/poppins/Poppins-Regular.otf')
  });

  if (!fontsLoaded) {
    return null;
  }

//{[styles.inputs, {backgroundColor: color}]}
  return (
    <SafeAreaView style={[styleCreatePack.container]}>
        <View>
            <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowtHeight/8}}/>
        </View>
        <View>
            <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Add your sticker pack</Text>
            <StickerNameInput/> 
            <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Tags</Text> 
            <TagInput/>
            <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Stickers</Text>
        </View>
        <StickersPreview/>
    </SafeAreaView>
  );
}
