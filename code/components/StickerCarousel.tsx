import * as React from 'react';
import { View, FlatList, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { SmallStickerPack, BigStickerPack } from '../components/StickerPack';

import { stickerCarouselStyle } from '../styles/StickerCarousel';
import { styles } from '../styles/Styles';

import { Sticker } from '../core/types';


/**
 * Component representing a generic sticker carousel.
 * Only used in this file.
 */
const StickerCarousel = ({stickers, item}: {stickers: Sticker[], item: (sticker: Sticker) => React.ReactNode}) => {
  console.log(stickers);
  const itemSeparator = () => <View style={stickerCarouselStyle.separator} />
  const navigation = useNavigation();
  const openStickerPage = (id: number) => {
    //@ts-ignore
    navigation.navigate("SingleSticker", {id: id});
  };
  const renderItem = (sticker: any) => (
    <Pressable onPress={() => openStickerPage(sticker.ID)} >{item(sticker)}</Pressable>
  );
  return (
    <View style={styles.center} >
      <FlatList
        horizontal={true}
        ItemSeparatorComponent={itemSeparator}
        showsHorizontalScrollIndicator={false}
        data={stickers}
        renderItem={renderItem}
        keyExtractor={(item: Sticker) => item.ID.toString()}
      />
    </View>
  );
}

/**
 * Component representing a carousel of small sticker packs.
 * Used in home page sections.
 */
export const SmallStickerCarousel = ({stickers}: {stickers: Sticker[]}) => {
  const item = (sticker: Sticker) => (
    <SmallStickerPack image={sticker.logo} title={sticker.name} downloadCount={sticker.nr_downloads} />
  );
  return <StickerCarousel stickers={stickers} item={item} />;
}

/**
 * Component representing a carousel of big sticker packs.
 * Used at the top of the home page.
 */
export const BigStickerCarousel = ({stickers}: {stickers: Sticker[]}) => {
  const item = (sticker: Sticker) => (
    <BigStickerPack image={sticker.logo} title={sticker.name} />
  );
  return <StickerCarousel stickers={stickers} item={item} />;
}
