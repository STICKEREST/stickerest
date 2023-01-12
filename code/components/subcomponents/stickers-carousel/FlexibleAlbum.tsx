import { Dimensions, ImageSourcePropType, ScrollView, TouchableOpacity, View } from "react-native";
import { SmallStickerPackBox } from "../SmallStickerPack";
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import React, {useState} from "react";
import { ImagesAssets } from "../../../assets/ImagesAssets";

const windowWidth = Dimensions.get('window').width;

const Sticker = ({img} : {img : string}) => {
    return (
        <View style = {{width: 100, margin: windowWidth*0.03}}>
            <SmallStickerPackBox img={img}/>
        </View>
    );
}

const TouchableSticker = ({img, onPress} : {img : string, onPress: () => void}) => {
    return (
        <TouchableOpacity key={'Select Image'} onPress={onPress}>
            <Sticker img={img}/>
        </TouchableOpacity>
    );
}

const FlexibleAlbum = ({images, addPress, onPress, addImages} : {images : string[], addPress: () => void, onPress: () => void, addImages: boolean}) => {

    const Album = () => {
        return (
            <View style={{alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: "row"}}>
                {addImages ?
                    <TouchableSticker img={ImagesAssets.addIcon} onPress={addPress} />: null
                }
                {images.map((img, index) => 
                    <TouchableSticker img={img} key={index} onPress={onPress}/>
                )}
            </View>
        );
    }
    return (
        <ScrollView>
            <Album/>
        </ScrollView>
    );
  }

export{FlexibleAlbum}