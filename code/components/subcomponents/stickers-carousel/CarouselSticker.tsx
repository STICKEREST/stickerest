import { SmallStickerPack, SmallStickerPackBox } from "../SmallStickerPack";
import { BigStickerPack } from '../BigStickerPack';
import { ImagesAssets } from '../../../assets/ImagesAssets';
import { styleCarousel } from "../../../assets/style/styleCarousel";

import { View, StyleSheet, FlatList, Pressable } from "react-native";

import { Sticker } from "../../types";

export default function CarouselSticker({stickers, type} : {stickers : Sticker[], type : "big" | "small"}) {

    const openStickerPack = (id : number) => {

        //apri pagina sticker

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
                        { type === "big" ? <BigStickerPack img={ImagesAssets.computer} title={item.name} /> 
                        : (type === "small" ? <SmallStickerPack img={ImagesAssets.computer} title={item.name} download={item.nr_downloads} /> : <View></View>)}
                    </Pressable>
                    )}               
                keyExtractor={item => item.ID.toString()}
            />
        </View>
    );
    
}
