import { Dimensions, ImageSourcePropType, ScrollView, TouchableOpacity, View } from "react-native";
import { SmallStickerPackBox } from "../SmallStickerPack";
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import React, {useState} from "react";
import { ImagesAssets } from "../../../assets/ImagesAssets";

const windowWidth = Dimensions.get('window').width;

const Column = ({img} : {img : ImageSourcePropType}) => {
    return (
    <View style = {{width: 100, margin: windowWidth*0.03}}>
        <SmallStickerPackBox img={img}/>
    </View>
    );
}

const FlexibleAlbum = ({images, onPress, addImages} : {images : ImageSourcePropType[], onPress: () => void, addImages: boolean}) => {

    const Album = () => {
        return (
            <View style={{alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: "row"}}>
                {addImages ? 
                    <TouchableOpacity key={'Select Image'} onPress={onPress}>
                        <Column img={ImagesAssets.addIcon}/>
                    </TouchableOpacity>: null}
                {images.map((img, index) => <Column img={img} key={index}/>)}
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