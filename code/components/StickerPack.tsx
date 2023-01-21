import * as React from 'react';
import { View, Image, Text } from 'react-native';

import { stickerPackStyle } from '../styles/StickerPack';
import { styles } from '../styles/Styles';

/**
 * Component used in the small sticker carousel to represent a sticker pack.
 */
export const SmallStickerPack = ({image, title, downloadCount}: {image: string, title: string, downloadCount: number}) => (
  <View>
    <View style={[styles.center, stickerPackStyle.stickerView, stickerPackStyle.whiteBackground, stickerPackStyle.regularSize]} >
      <Image source={{uri: image}} style={stickerPackStyle.imageSize} />
    </View>
    <Text style={stickerPackStyle.packTitle} >{title}</Text>
    <Text style={stickerPackStyle.packDownloads} >{downloadCount} downloads</Text>
  </View>
);

/**
 * Component used in the big sticker carousel to represent a sticker pack.
 */
export const BigStickerPack = ({image, title}: {image: string, title: string}) => (
  <View style={[stickerPackStyle.largeSize, stickerPackStyle.stickerView, stickerPackStyle.purpleBackground, styles.center, styles.flexRow, styles.padding]} >
    <View style={styles.flexFill} >
      <Image source={{uri: image}} style={stickerPackStyle.largeImage} />
    </View>
    <View style={styles.flexFill} >
      <Text style={stickerPackStyle.largeTitle} >{title}</Text>
    </View>
  </View>
);
