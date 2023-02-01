import React from 'react';
import { View, Text, Dimensions, ImageBackground, Alert } from 'react-native';

import { FlexibleAlbumRedirect } from '../general/FlexibleAlbum';
import { ImagesAssets } from '../../../assets/img/ImagesAssets';

import { styles } from '../../styles/Styles';

import { StickerPack, StickerImage, SetStickerPackArray } from '../../../core/types';
import { getSavedStickers } from '../../../core/stickers/stickerUtilities';
import { errorAlert } from '../general/GeneralComponents';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * This function manages the constant update of the favorite page that can be changed by actions of the
 * user taken elsewhere
 */
const getUpdated = (setQueriedStickers : SetStickerPackArray) => {

  React.useEffect(() => {
    console.log("Getting saved stickers...");
    
    getSavedStickers()
    .then(result => setQueriedStickers(result))
    .catch(error => errorAlert(error.message));

    const intervalId = setInterval(() => {
      
      getSavedStickers()
      .then(result => setQueriedStickers(result))
      .catch(error => errorAlert(error.message));

      //it's updated every 5 seconds, to avoid memory leaks
    }, 5000);

    return () => clearInterval(intervalId);

    }, [] );

}

const Title = () => (
  <Text style={[styles.textHeader2, styles.marginTop]} >
    Favorites
  </Text>
)

const StickerAlbum = ({queriedStickers} : {queriedStickers : StickerPack[]}) => (
  <View style={[{height: windowHeight*0.525, paddingLeft: windowWidth/50, }, styles.flexRow]}>
    <FlexibleAlbumRedirect stickers={
        queriedStickers.map((image: StickerPack, order: number): StickerImage =>
              ({ID: image.ID, ordinal_order: order, image_file: image.logo})
        )
      }
      />
  </View>
)

/**
 * Favourites page component
 */
export default function Favorites() {
  const [queriedStickers, setQueriedStickers] = React.useState<StickerPack[]>([]);
  
  getUpdated(setQueriedStickers);

  return (
    <View>
      <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
      <Title />
      <StickerAlbum queriedStickers={queriedStickers}/>      
    </View>
  );
}
