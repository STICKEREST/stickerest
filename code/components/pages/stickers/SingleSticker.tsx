import React from 'react'
import { Dimensions, ImageBackground,  ImageSourcePropType,  TouchableHighlight  } from 'react-native';
import { Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import { styleSingleSticker } from "../../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../../assets/ImagesAssets';

import { BigStickerPack } from '../../subcomponents/BigStickerPack';

import { SmallStickerPackBox } from '../../subcomponents/SmallStickerPack';

const RightPartInfo = ({name, author, numSticker, downloads} : {name : string, author : string, numSticker : number, downloads : number}) => {
    
    const [fontsLoaded] = useFonts({
        'poplight': require('./../../../assets/fonts/poppins/Poppins-Light.otf'),
        'popbold': require('./../../../assets/fonts/poppins/popblack.otf')
      });
    
    return (
        <View style={{flexDirection: 'column', padding: 20 }}>
            <Text style= {{fontFamily: "popbold", fontSize: 19}}>{name}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>by {author}</Text>
            <Text style= {{fontFamily: "popbold", fontSize: 19, marginTop: 10}}>{numSticker}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>Stickers</Text>
            <Text style= {{fontFamily: "popbold", fontSize: 19, marginTop: 10}}>{downloads}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>Downloads</Text>
        </View>
    );
}

const LeftPartIcon = ({img}: {img: ImageSourcePropType}) => {
        
    return (
        <View style={[styleSingleSticker.mainStickerView2, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 }]}>
            <Image source={img} style={{height: 85, width: 100}}/>
        </View>
    );
}

const RightPartButton = () => {
    return (
        <View>
            <TouchableHighlight style={{height: 40, width: 40}}>
                <Image source={ImagesAssets.hearth} style={{height: 25, width: 25, shadowColor: '#090909',shadowOffset: {width: 0, height: 1},shadowOpacity: 0.8,shadowRadius: 1}}/>
            </TouchableHighlight>
        </View>
    );
}

const BigStickerPack2 = ({img, name, author, numSticker, downloads} : {img: ImageSourcePropType, name : string, author : string, numSticker : number, downloads : number}) => {
    

    return (
        <View style={[styleSingleSticker.bigStickerPack2, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
            <View style={{flex : 3}}>
                <LeftPartIcon img={img} />
            </View>
            <View style={{flex : 4, marginLeft : 13}}>
                <RightPartInfo name={name} author={author} numSticker={numSticker} downloads={downloads}/>
            </View>
            <View style={{flex : 1}}>
                <RightPartButton />
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
            <BigStickerPack2 img={ImagesAssets.computer} name={"Trendy Computer"} author={"Francesco"} numSticker={23} downloads={1990}/>
            <View style={{marginTop: 20, flexDirection: 'row'}}>
                <View style={{marginRight: 15}}>
                    <SmallStickerPackBox img={ImagesAssets.computer} />
                </View>
                <View style={{marginRight: 15}}>
                    <SmallStickerPackBox img={ImagesAssets.computer}/>
                </View>
            </View>
            {/* TODO rendi tutto uno state usando hooks*/}
        </View>
    </View>
  );
}
