import { SmallStickerPack, SmallStickerPackBox } from "../SmallStickerPack";
import { BigStickerPack } from '../BigStickerPack';
import { styleCarousel } from "../../../assets/style/styleCarousel";

import { View, StyleSheet, FlatList, Pressable } from "react-native";

import { Sticker } from "../../../core/types";

import { useNavigation } from '@react-navigation/native';
import React from "react";

export default function CarouselSticker({stickers, type} : {stickers : Sticker[], type : "big" | "small"}) {

    const navigation = useNavigation();

    const openStickerPack = (id : number) => {
        //@ts-ignore
        navigation.navigate("SingleSticker", {id: id});
    }

    return (
        <View style={styleCarousel.container}> 
            <FlatList
                horizontal
                ItemSeparatorComponent={() => <View style={{marginRight: 25}} />}
                showsHorizontalScrollIndicator={false}
                data = {stickers}
                renderItem={({ item }) => (
                    <Pressable onPress={() => openStickerPack(item.ID)}> 
                        { type === "big" ? <BigStickerPack img={item.logo} title={item.name} /> 
                        : (type === "small" ? <SmallStickerPack img={item.logo} title={item.name} download={item.nr_downloads} /> : <View></View>)}
                    </Pressable>
                    )}               
                keyExtractor={item => item.ID.toString()}
            />
        </View>
    );
    
}
