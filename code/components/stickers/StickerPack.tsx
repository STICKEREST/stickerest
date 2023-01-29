import * as React from 'react';
import { View, Image, Text } from 'react-native';

import { stickerPackStyle } from '../../styles/StickerPack';
import { styles } from '../../styles/Styles';

/**
 * This class offers differrent possibilities for representing a single sticker pack in the UI
 */

/**
 * Component that shows the sticker pack just as a small sticker pack with no info other than a representing image
 */
export const SmallPackBox = ({image}: {image: string}) => (
  <View style={[styles.center, stickerPackStyle.stickerView, stickerPackStyle.whiteBackground, stickerPackStyle.regularSize]} >
    <Image source={{uri: image}} style={stickerPackStyle.imageSize} />
  </View>
);

/**
 * Component that shows the sticker pack as a small sticker pack, using SmallPackBox, says also the title and the number of downloads
 */
export const SmallStickerPack = ({image, title, downloadCount}: {image: string, title: string, downloadCount: number}) => (
  <View>
    <SmallPackBox image={image} />
    <Text style={stickerPackStyle.packTitle} >{title}</Text>
    <Text style={stickerPackStyle.packDownloads} >{downloadCount} downloads</Text>
  </View>
);

/**
 * Component that shows the sticker pack as a big pack but with just a representing image
 */
export const BigPackBox = ({image}: {image: string}) => (
  <View style={styles.flexFill} >
    <Image source={{uri: image}} style={stickerPackStyle.largeImage} />
  </View>
);

/**
 * Component that shows the sticker pack as a big pack, divided in two columns, one for the representing image 
 * and the other for the title
 */
export const BigStickerPack = ({image, title}: {image: string, title: string}) => (
  <View style={[stickerPackStyle.largeSize, stickerPackStyle.stickerView, stickerPackStyle.purpleBackground, styles.center, styles.flexRow, styles.padding]} >
    <BigPackBox image={image} />
    <View style={styles.flexFill} >
      <Text style={stickerPackStyle.largeTitle} >{title}</Text>
    </View>
  </View>
);
