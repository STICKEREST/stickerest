import * as React from 'react';
import { View, FlatList, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { SmallStickerPack, BigStickerPack } from '../stickers/StickerPack';

import { stickerCarouselStyle } from '../../styles/StickerCarousel';
import { styles } from '../../styles/Styles';

import { OnStickerPackFunction, StickerPack } from '../../../core/types';

/**
 * This class provides components for a displayable way to see a set of sticker. This is Carousel-Based
 */

/**
 * Component representing a generic sticker carousel, horizontal sliding
 */
const StickerCarousel = ({stickers, itemFunction}: {stickers: StickerPack[], itemFunction: OnStickerPackFunction}) => {
  const itemSeparator = () => <View style={stickerCarouselStyle.separator} />
  const navigation = useNavigation();
  const openStickerPage = (id: number) => {
    //@ts-ignore
    navigation.navigate("SingleSticker", {id: id});
  };
  return (
    <View style={styles.center} >
      <FlatList
        horizontal={true}
        ItemSeparatorComponent={itemSeparator}
        showsHorizontalScrollIndicator={false}
        data={stickers}
        renderItem={({item}) => (
          <Pressable onPress={() => openStickerPage(item.ID)} >{itemFunction(item)}</Pressable>
        )}
        keyExtractor={(item: StickerPack) => item.ID.toString()}
      />
    </View>
  );
}

/**
 * Component that using the StickerCarousel allows small sticker packs to be displayed
 */
export const SmallStickerCarousel = ({stickers}: {stickers: StickerPack[]}) => {
  const item = (sticker: StickerPack) => (
    <View style={styles.paddingSmall} >
      <SmallStickerPack image={sticker.logo} title={sticker.name} downloadCount={sticker.nr_downloads} />
    </View>
  );
  return <StickerCarousel stickers={stickers} itemFunction={item} />;
}

/**
 * Component that using the StickerCarousel allows big sticker packs to be displayed
 */
export const BigStickerCarousel = ({stickers}: {stickers: StickerPack[]}) => {
  const item = (sticker: StickerPack) => (
    <View style={styles.paddingSmall} >
      <BigStickerPack image={sticker.logo} title={sticker.name} />
    </View>
  );
  return <StickerCarousel stickers={stickers} itemFunction={item} />;
}
