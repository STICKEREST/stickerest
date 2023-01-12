import React, { useEffect, useState } from 'react'
import { Dimensions, ImageBackground,  ImageSourcePropType,  TouchableHighlight, TouchableOpacity  } from 'react-native';
import { Text, View, Image } from 'react-native';

import { styleSingleSticker } from "../../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../../assets/ImagesAssets';

import { BigStickerPack } from '../../subcomponents/BigStickerPack';

import { SmallStickerPackBox } from '../../subcomponents/SmallStickerPack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Sticker, StickerImage } from '../../types';

//TODO: aggiungi saved button e chiamate

const ImportButton = () => {
    return (
        <View>
            <TouchableOpacity  style={{backgroundColor: '#8D08F5', paddingTop: 8, paddingBottom: 8, borderRadius: 20, width: 160}}>
                <Text style={{color: 'white', fontFamily: 'poplight', fontSize: 16, textAlign:"center"}}>Import Pack</Text>
            </TouchableOpacity>
        </View>
    )
}

const RightPart = ({name, author, numSticker, downloads} : {name : string, author : string, numSticker : number, downloads : number}) => {
    return (
        <View style={{flexDirection: 'column', padding: 20 }}>
            <Text style= {{fontFamily: "popbold", fontSize: 17}}>{name}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>by {author}</Text>
            <Text style= {{fontFamily: "popbold", fontSize: 17, marginTop: 10}}>{numSticker}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>Stickers</Text>
            <Text style= {{fontFamily: "popbold", fontSize: 17, marginTop: 10}}>{downloads}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>Downloads</Text>
        </View>
    );
}

const LeftPart = ({img}: {img: string}) => {
        
    return (
        <View style={[styleSingleSticker.mainStickerView2, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20 }]}>
            <Image source={{uri : img}} style={{height: 85, width: 100}}/>
        </View>
    );
}

const LikeButton = ({ID} : {ID : number}) => {

    const [favourite, setFavourite] = useState<boolean>(false);
    //TODO aggiungi i n backend chiamata per sapere se attualmente è favorite

    const addToFav = () => {

        if(favourite === true)
            fetch(`https://stickerest.herokuapp.com/auth/remove-favorites-${ID}`);
        else
            fetch(`https://stickerest.herokuapp.com/auth/add-favorites-${ID}`);

        setFavourite(!favourite);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => addToFav()}>
                <Ionicons
                name='md-heart'
                size={40}
                color={favourite ? "#F44336" : '#9E9E9E'}
                />
            </TouchableOpacity>
        </View>
    );
}

const StickerPackContainer = ({ID, img, name, author, numSticker, downloads} : {ID : number, img: string, name : string, author : string, numSticker : number, downloads : number}) => {
    

    return (
        <View style={[styleSingleSticker.bigStickerPack2, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}]}>
            <View style={{flex : 3}}>
                <LeftPart img={img} />
            </View>
            <View style={{flex : 4, marginLeft : 20}}>
                <RightPart name={name} author={author} numSticker={numSticker} downloads={downloads}/>
            </View>
            <View style={{flex : 1.5}}>
                <LikeButton ID = {ID} />
                <LikeButton ID = {ID} />
            </View>
        </View>
    )
    
}

export const SingleSticker = ({route, navigation}) => {

    const ID = route.params.id;

    const [stickerInfo, setStickerInfo] = React.useState<Sticker>();
    const [imageStickers, setImageStickers] = React.useState<StickerImage[]>();

  useEffect(() => {

    fetch(`https://stickerest.herokuapp.com/stickers/${ID}`)
    .then((result) => result.json())
    .then((result) => setStickerInfo(result[0]));

    fetch(`https://stickerest.herokuapp.com/stickers/images-${ID}`)
    .then((result) => result.json())
    .then((result) => setImageStickers(result.slice(1)));

  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  

  return (
    <View style={styleSingleSticker.container}>
        <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}>
        </ImageBackground>

        <View style={{marginTop: 30}}>
            {
                stickerInfo !== undefined ? 
                
                <View>
                    <StickerPackContainer img={stickerInfo.logo} ID={stickerInfo.ID} name={stickerInfo.name} author={stickerInfo.Designer} numSticker={23} downloads={stickerInfo.nr_downloads}/>
                    <View style={{marginTop: 20, flexDirection: 'row', justifyContent: 'center'}}>
                        <ImportButton />
                    </View>
                    
                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                        {/* <View style={{marginRight: 15}}>
                            <SmallStickerPackBox img={ImagesAssets.computer} />
                        </View>
                        <View style={{marginRight: 15}}>
                            <SmallStickerPackBox img={ImagesAssets.computer}/>
                        </View> */}
                        {
                            imageStickers !== undefined ? 

                            // <Text> {JSON.stringify(otherStickers)} </Text>
                            <View></View>

                            : <Text> A problem occurred while loading the sticker</Text>
                        }
                    </View>
                </View> : <Text> A problem occurred while loading the sticker</Text>
            }
            {/* TODO rendi tutto uno state usando hooks*/}
        </View>
    </View>
  );
}
