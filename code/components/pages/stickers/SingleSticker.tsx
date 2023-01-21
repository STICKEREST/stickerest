import React, { useEffect, useState, useCallback } from 'react'
import { Dimensions, ImageBackground,  ImageSourcePropType,  TouchableHighlight, TouchableOpacity  } from 'react-native';
import { Text, View, Image } from 'react-native';

import { styleSingleSticker } from "../../../assets/style/styleSingleSticker";
import { ImagesAssets } from '../../../assets/ImagesAssets';

import { BigStickerPack } from '../../subcomponents/BigStickerPack';

import { SmallStickerPackBox } from '../../subcomponents/SmallStickerPack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Sticker, StickerImage } from '../../../core/types';
import { FlexibleAlbum } from '../../subcomponents/stickers-carousel/FlexibleAlbum';
import { color } from '@rneui/themed/dist/config';

import * as Telegram from '../../../api/Telegram';

//TODO: metti questo in core



//TODO: aggiungi saved button e chiamate

const ImportButton = ({text, onPress}: {text: string, onPress: () => void}) => {
    return (
        <View>
            <TouchableOpacity style={{backgroundColor: '#8D08F5', paddingTop: 8, paddingBottom: 8, borderRadius: 20, width: 180, marginTop: 8}} onPress={onPress}>
                <Text style={{color: 'white', fontFamily: 'poplight', fontSize: 16, textAlign:"center"}}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const RightPart = ({name, author, numSticker, downloads} : {name : string, author : string, numSticker : number, downloads : number}) => {
    return (
        <View style={{flexDirection: 'column', padding: 20 }}>
            <Text style= {{fontFamily: "popblack", fontSize: 17}}>{name}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>by {author}</Text>
            <Text style= {{fontFamily: "popblack", fontSize: 17, marginTop: 10}}>{numSticker}</Text>
            <Text style= {{fontFamily: "poplight", fontSize: 13}}>Stickers</Text>
            <Text style= {{fontFamily: "popblack", fontSize: 17, marginTop: 10}}>{downloads}</Text>
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

const ButtonState = ({ID, state_name, logo_name, color_state } : {ID : number, state_name : string, logo_name : string, color_state : string}) => {

    const [state, setState] = React.useState<boolean>(false);

    useEffect (() => {

        fetch(`https://stickerest.herokuapp.com/auth/is-${state_name}-${ID}`)
        .then((result) => result.json())
        .then((result) => setState(result))
        .catch(error => console.log(error));
        
    }, []);

    const changeState = () => {

        if(state === true)
            fetch(`https://stickerest.herokuapp.com/auth/remove-${state_name}-${ID}`)
            .then(result => console.log(result))
            .catch(error => console.log(error));
        else
            fetch(`https://stickerest.herokuapp.com/auth/add-${state_name}-${ID}`)
            .then(result => console.log(result))
            .catch(error => console.log(error));

        setState(!state);
    }

    return (
        <View>
            <TouchableOpacity onPress={() => changeState()}>
                <Ionicons
                name={logo_name}
                size={40}
                color={state ? color_state : '#9E9E9E'}
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
                <ButtonState ID = {ID} state_name = "favorites" logo_name='md-heart' color_state='#F44336'/>
                <ButtonState ID = {ID} state_name = "saved" logo_name='md-bookmark' color_state='#F5CB08'/>
            </View>
        </View>
    )
    
}

export const SingleSticker = ({route , navigation} : {route : any , navigation : any}) => {

    const ID = route.params.id;

    const [stickerInfo, setStickerInfo] = React.useState<Sticker>();
    const [imageStickers, setImageStickers] = React.useState<StickerImage[]>();

    //TODO: spostali in core e wrappali in una funzione

  useEffect(() => {

    fetch(`https://stickerest.herokuapp.com/stickers/${ID}`)
    .then((result) => result.json())
    .then((result) => setStickerInfo(result[0]))
    .catch(error => console.log(error));

    fetch(`https://stickerest.herokuapp.com/stickers/images-${ID}`)
    .then((result) => result.json())
    .then((result) => setImageStickers(result.slice(1)))
    .catch(error => console.log(error));

    
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const addDownload = () => {
    
    fetch(`https://stickerest.herokuapp.com/stickers/download-${ID}`)
    .then((result) => result.json())
    .then((result) => console.log(result))
    .catch(error => console.log(error));

  }

  const importToTelegram = () => {

    addDownload();

    // TODO: Add sticker name here
    Telegram.importPack('example_one_by_StickerestBot')
    .then(response => console.log(response))
    .catch(error => console.log(error));
  };

  

  return (
    <View style={styleSingleSticker.container}>
        <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}>
        </ImageBackground>

        <View style={{marginTop: 30}}>
            {
                stickerInfo !== undefined ? 
                
                <View>
                    <StickerPackContainer img={stickerInfo.logo} ID={stickerInfo.ID} name={stickerInfo.name} author={stickerInfo.Designer} numSticker={stickerInfo.n_stickers} downloads={stickerInfo.nr_downloads}/>
                    <View style={{marginTop: 20, flexDirection: 'column', alignItems: 'center'}}>
                        {/* <ImportButton text={"Import to Whatsapp"} onPress={() => {}}/> */}
                        <ImportButton text={"Import to Telegram"} onPress={() => importToTelegram()}/>
                    </View>
                    <View style={{marginTop: 20, flexDirection: 'row'}}>
                        {
                            imageStickers !== undefined ? 

                            <FlexibleAlbum stickers={imageStickers}/>

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
