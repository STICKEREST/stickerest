import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { SmallPackBox } from "./StickerPack";

import { styles } from "../styles/Styles";

import { StickerImage } from "../core/types";

import { useNavigation } from "@react-navigation/native";


/**
 * Component used for stickers that can be touched
 */
const TouchableSticker = ({img, onPress}: {img: string, onPress: () => void}) => (
  <TouchableOpacity key={'Select Image'} onPress={onPress} >
    <SmallPackBox image={img} />
  </TouchableOpacity>
);

/**
 * Component used to display a list of stickers
 */
const Album = ({stickers, onPressAggregation = null }: {stickers: StickerImage[], onPressAggregation? : (id: number) => void}) => (
  <>
  {
    stickers.map((sticker, index) => onPressAggregation !== null ? (
        <TouchableSticker img={sticker.image_file} key={index} onPress={() => onPressAggregation(sticker.ID)} />
      ) : (
        <View style={styles.paddingSmall} key={index} >
          <SmallPackBox image={sticker.image_file} />
        </View>
      )
    )
  }
  </>
);

/**
 * Component used in the single sticker page to display the sticker album
 */
export const FlexibleAlbum = ({stickers}: {stickers: StickerImage[]}) => (
  <ScrollView>
    <View style={styles.flexRowWrap} >
      <Album stickers={stickers} />
    </View>
  </ScrollView>
);

export const FlexibleAlbumAddable = ({stickers, addPress, removePress}: {stickers: StickerImage[], addPress: any, removePress: any}) => (
  <ScrollView>
    <View style={styles.flexRowWrap} >
      <TouchableSticker img={'https://res.cloudinary.com/hv5jgvu0r/image/upload/v1674325588/addCircle_ejdz25.png'} onPress={addPress} />
      <Album stickers={stickers} onPressAggregation={removePress} />
    </View>
  </ScrollView>
);

export const FlexibleAlbumRedirect = ({stickers}: {stickers: StickerImage[]}) => {
  const navigation = useNavigation();
  const openStickerPack = (id : number) => {
    //@ts-ignore
    navigation.navigate("SingleSticker", {id: id});
  }
  return (
    <ScrollView>
      <View style={styles.flexRowWrap} >
        <Album stickers={stickers} onPressAggregation={openStickerPack} />
      </View>
    </ScrollView>
  );
}
