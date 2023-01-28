import React from 'react';
import { View, Text, Dimensions, ImageBackground } from 'react-native';

import { FlexibleAlbumRedirect } from '../components/FlexibleAlbum';
import { ImagesAssets } from '../assets/ImagesAssets';

import { styles } from '../styles/Styles';

import { Sticker, StickerImage } from '../core/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * Favourites page component
 */
export default function Favorites() {
  const [queriedStickers, setQueriedStickers] = React.useState<Sticker[]>([]);
  //it's updated every 5 seconds, to avoid memory leaks
  React.useEffect(() => {
    fetch("https://stickerest.herokuapp.com/auth/my-saved")
      .then((response) => response.json())
      .then((result) => setQueriedStickers(result))
      .catch(error => console.log(error));
    const intervalId = setInterval(() => {
      fetch("https://stickerest.herokuapp.com/auth/my-saved")
        .then((response) => response.json())
        .then((result) => setQueriedStickers(result))
        .catch(error => console.log(error));
    }, 5000);
    return () => clearInterval(intervalId);
    }, [] );
  return (
    <View>
      <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
      <Text style={[styles.textHeader2, styles.marginTop]} >
        Favorites
      </Text>
      <View style={[{height: windowHeight*0.525, paddingLeft: windowWidth/50, }, styles.flexRow]}>
        <FlexibleAlbumRedirect stickers={
            queriedStickers.map((image: Sticker, order: number): StickerImage =>
                  ({ID: image.ID, ordinal_order: order, image_file: image.logo})
            )
          }
          />
      </View>
    </View>
  );
}
