import { Dimensions, ImageSourcePropType, ScrollView, TouchableOpacity, View } from "react-native";
import { SmallStickerPackBox } from "../SmallStickerPack";
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import React, {useState} from "react";
import { ImagesAssets } from "../../../assets/ImagesAssets";
import { Sticker, StickerImage } from "../../../core/types";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;

const StickerContainer = ({img} : {img : string}) => {
    return (
        <View style = {{width: 100, margin: windowWidth*0.01, marginBottom : windowWidth*0.06}}>
            <SmallStickerPackBox img={img}  smaller = {true}/>
        </View>
    );
}

const TouchableSticker = ({img, onPress} : {img : string, onPress: () => void}) => {
    return (
        <TouchableOpacity key={'Select Image'} onPress={() => onPress()}>
            <StickerContainer img={img}/>
        </TouchableOpacity>
    );
}

const Album = ({stickers, onPressAggregation = null } : {stickers : StickerImage[], onPressAggregation? : any}) => {

    
    return (
        <>
            {stickers.map((sticker, index) => 
                onPressAggregation !== null ? 
                    <TouchableSticker img={sticker.image_file} key={index} onPress={() => onPressAggregation(sticker.ID)} />
                    : <StickerContainer img={sticker.image_file} key={index} />
                
            )}
        </>
    );
}


export const FlexibleAlbum = ({stickers} : {stickers : StickerImage[]}) => {

    return (
        <ScrollView>
            <View style={{alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: "row"}}>
                <Album stickers={stickers}/>
            </View>
        </ScrollView>
    );
  }

export const FlexibleAlbumAddable = ({stickers, addPress, removePress} : {stickers : StickerImage[], addPress : any, removePress :any}) => {

return (
    <ScrollView>
        <View style={{alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: "row"}}>
            <TouchableSticker img={'https://res.cloudinary.com/hv5jgvu0r/image/upload/v1674325588/addCircle_ejdz25.png'} onPress={addPress} />
            <Album stickers={stickers} onPressAggregation={removePress}/>
        </View>
    </ScrollView>
);
}

export const FlexibleAlbumRedirect = ({stickers} : {stickers : StickerImage[]}) => {

    const navigation = useNavigation();

    const openStickerPack = (id : number) => {
        //@ts-ignore
        navigation.navigate("SingleSticker", {id: id});
    }

    return (
        <ScrollView>
            <View style={{alignItems: 'flex-start', flexWrap: 'wrap', flexDirection: "row"}}>
                <Album stickers={stickers} onPressAggregation={openStickerPack}/>
            </View>
        </ScrollView>
    );

}