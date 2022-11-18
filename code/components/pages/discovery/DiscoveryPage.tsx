import React from 'react'
import { Dimensions, ImageBackground,  TouchableHighlight  } from 'react-native';
import { Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import { styleSingleSticker } from "../../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../../assets/ImagesAssets';

const ButtonInteraction = () => {
    const windowWidth = Dimensions.get('window').width;

    return (

        <View style={[styleSingleSticker.btnContainer, {padding: 5, flexDirection: 'row', alignItems: 'center', width: 175}]}>

            <TouchableHighlight>
                <Image source={ImagesAssets.hearth} style={{height: 30, width: 30, marginLeft: 10, marginRight: 10}} />                
            </TouchableHighlight>

            <TouchableHighlight>
                <Image source={ImagesAssets.bookmark} style={{height: 40, width: 40, marginLeft: 10, marginRight: 10}} />                
            </TouchableHighlight>

            <TouchableHighlight>
                <Image source={ImagesAssets.export} style={{height: 40, width: 40, marginLeft: 10, marginRight: 10}} />                
            </TouchableHighlight>

        </View>

    );
}

const IconPack = () => {
    
    return (

        <View>
            <Image source={ImagesAssets.questionMark} />
        </View>
    );
}

const Sticker = ({icon}:{icon:Image}) => {

    return (

        <View style={[styleSingleSticker.stickerView, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginRight: 15}]}>
            <Image source={ImagesAssets.computer} style={{height: 70, width: 90, marginLeft: 10}} />
        </View>

    );
}


const MainStickerView = () => {

    return (
        <View style={[styleSingleSticker.mainStickerView, {alignItems: 'center', justifyContent: 'center', padding: 20}]} >
                <IconPack/>

            {/* <View style={{flex: 1}}>

            </View> */}
        </View>
    )
}



export default function DicoveryPage() {
  
  const [fontsLoaded] = useFonts({
    'popblack': require('../../../assets/fonts/poppins/popblack.otf'),
    // 'poppinsLight': require('../../../assets/fonts/poppins/Popping-Light.otf')
  });

//   const [fontsLoaded] = useFonts({
//     'poppinsLight': require('../../../assets/fonts/poppins/Popping-Light.otf'),
//   });

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

            <Text style={{fontFamily: "popblack", fontSize: 25, paddingTop: 20, paddingBottom:5}}>Discovery</Text>
            <Text style={{/*fontFamily: "poppinsLight",*/ fontSize: 15, paddingBottom:20}}>Shake the device for a random sticker pack</Text> 

            
            <MainStickerView/>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
                <Sticker icon={ImagesAssets.questionMark}/>
                <Sticker icon={ImagesAssets.questionMark}/>
            </View>
            <Text style={{fontFamily: "popblack", fontSize: 25, paddingTop: 20, paddingBottom:5}}>???</Text> 
            <Text style={{/*fontFamily: "poppinsLight",*/ fontSize: 20, paddingBottom:20}}>??</Text> 
            {/* TODO rendi tutto uno state usando hooks*/}
            {/* <ButtonInteraction /> */}
        </View>
    </View>
  );
}
