import React from 'react'
import { Dimensions, ImageBackground } from 'react-native';
import { Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import { styleSingleSticker } from "../../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../../assets/ImagesAssets';

const ButtonInteraction = () => {
    const windowWidth = Dimensions.get('window').width;

    return (

        <View style={[styleSingleSticker.btnContainer, {padding: 5}]}>

            {/* <Clickable>

            </Clickable> */}

        </View>

    );
}

const IconPack = () => {
    
    return (

        <View>
            <Image source={ImagesAssets.computer}>
            </Image>
        </View>
    );
}

const Sticker = ({icon}:{icon:Image}) => {

    return (

        <View style={[styleSingleSticker.stickerView, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
            <Image source={ImagesAssets.computer} style={{height: 70, width: 90, marginLeft: 10}}>
            </Image>
        </View>

    );
}


const MainStickerView = () => {

    return (
        <View style={[styleSingleSticker.mainStickerView, {flexDirection: 'row', alignItems: 'center', padding: 20}]} >
            <View style={{flex: 1}}>
                <IconPack/>
            </View>

            <View style={{flex: 1}}>

            </View>
        </View>
    )
}



export default function SingleSticker() {
  
  const [fontsLoaded] = useFonts({
    'popblack': require('../../../assets/fonts/poppins/popblack.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styleSingleSticker.container}>
        <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}>
        </ImageBackground>

        <View style={{marginTop: 30}}>
            <MainStickerView/>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
                <Sticker icon={ImagesAssets.computer}/>
                <Sticker icon={ImagesAssets.computer}/>
            </View>
            <Text>Trendy Computer</Text> 
            {/* TODO rendi tutto uno state usando hooks*/}
            <ButtonInteraction />
        </View>
    </View>
  );
}
