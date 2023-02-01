import React from 'react'
import { Alert, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'react-native';

import { styles } from "../../styles/Styles";
import { ImagesAssets } from '../../../assets/img/ImagesAssets';
import { StickerPack, StickerImage, SetStickerPack, SetStickerImageArray } from '../../../core/types';
import { FlexibleAlbum } from '../general/FlexibleAlbum';

import { useRoute } from '@react-navigation/native';

import * as Telegram from '../../../core/api/Telegram';
import { errorAlert, UploadingAnimation } from '../general/GeneralComponents';
import { DetailedBigStickerPack } from './StickerPack';
import { addDownload, getStickerFromId, getStickerImagesFromId } from '../../../core/stickers/stickerUtilities';


// Used for background image
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * Button displayed below the sticker pack used to import stickers into other apps.
 * 'text' is the text to display on the button.
 * 'onPress' is the function to execute when pressing the button.
 */
const ImportButton = ({text, onPress}: {text: string, onPress: VoidFunction}) => (
  <View>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  </View>
);

/**
 * Button using ImportButton for uploading the sticker pack in telegram (only if this results available from
 * what the DB says, so only if the creator has inseted his telegram ID before uploading the Pack) 
 */
const ImportTelegramButton = ({StickerInfo, updatePage} : {StickerInfo : StickerPack, updatePage : VoidFunction}) => {

  const importToTelegram = () => {
    Telegram.importPack(StickerInfo.telegram_name);
    addDownload(StickerInfo.ID)
    .then(() => updatePage())
    .catch(error => errorAlert(error.message));
  }

  return (
    <View style={[styles.flexColumn, styles.marginTop]} >
      {
        StickerInfo.telegram_name !== undefined && StickerInfo.telegram_name !== "" && StickerInfo.telegram_name !== null
        ? <ImportButton text={"Import to Telegram"} onPress={importToTelegram} /> : <></>
      }
    </View>    
  )
}

const StickerAlbum = ({stickerImage} : {stickerImage : StickerImage[]}) => (
  <View style={[styles.flexRow, styles.marginTop,  {height: windowHeight/2, paddingLeft: windowWidth/50}]} >
    {
      stickerImage !== undefined ? <FlexibleAlbum stickers={stickerImage}/> : <Text> A problem occurred while loading the sticker</Text>
    }
  </View>
)

/**
 * Single sticker page component.
 */
export const SingleSticker = () => {
  //@ts-ignore
  const id = useRoute().params.id;

  // Get currently selected sticker from database
  const [sticker, setSticker] = React.useState<StickerPack>();
  const [stickerImage, setStickerImage] = React.useState<StickerImage[]>();
  
  const [downloading, setDownloading] = React.useState<boolean>(false);

  const loadSticker = async (setSticker : SetStickerPack) : Promise<void> => {
      setSticker(await getStickerFromId(id));
  }

  const loadImages = async (setStickerImage : SetStickerImageArray) : Promise<void> => {
    setStickerImage(await getStickerImagesFromId(id));
  }

  const loadStickerPage = () => {
    setDownloading(true);
    console.log("Loading sticker page...");
    Promise.all([loadSticker(setSticker), loadImages(setStickerImage)])
    .then(() => setDownloading(false))
    .catch(error => errorAlert(error.message));
  }

  React.useEffect(loadStickerPage, []);
  
  return (
    <View>
      <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}></ImageBackground>
      <View style={styles.marginTop}>
        {
          !downloading ? 
          <>
          {
            sticker !== undefined ? (
              <View style={styles.center}>
                <DetailedBigStickerPack stickerInfo={sticker} />
                <ImportTelegramButton StickerInfo={sticker} updatePage={loadStickerPage}/>
                <StickerAlbum stickerImage = {stickerImage} />
              </View>
            ) : (
              <Text> A problem occurred while loading the sticker</Text>
            )
          }
          </> :
          <UploadingAnimation message = "Downloading..." />
        }
      </View>
    </View>
  );
}
