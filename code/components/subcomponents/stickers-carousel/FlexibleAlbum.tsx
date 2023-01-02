import { Dimensions, ImageSourcePropType, ScrollView, View } from "react-native";
import { SmallStickerPackBox } from "../SmallStickerPack";
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import React, {useState} from "react";

const windowWidth = Dimensions.get('window').width;

const Column = ({img} : {img : ImageSourcePropType}) => {
    return (
    <View style = {{width: 100}}>
        <SmallStickerPackBox img={img}/>
    </View>
    );
}

const FlexibleAlbum = ({images} : {images : ImageSourcePropType[]}) => {

    const Album = () => {
        return (
            <View style={{alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: "row"}}>
                {images.map((i) => <Column img={i}/>)}
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