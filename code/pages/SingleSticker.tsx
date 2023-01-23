import React from 'react'
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, View, Image } from 'react-native';

import { singleStickerStyle } from "../styles/SingleSticker";
import { styles } from "../styles/Styles";
import { ImagesAssets } from '../assets/ImagesAssets';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Sticker, StickerImage } from '../core/types';
import { FlexibleAlbum } from '../components/FlexibleAlbum';
import { color } from '@rneui/themed/dist/config';

import { useRoute } from '@react-navigation/native';

import * as Telegram from '../api/Telegram';


//TODO: metti questo in core
const addDownload = (id : number) => {
  fetch(`https://stickerest.herokuapp.com/stickers/download-${id}`)
    .then((result) => result.json())
    .then((result) => console.log(result));
}

/**
 * Button displayed below the sticker pack used to import stickers into other apps.
 * 'text' is the text to display on the button.
 * 'onPress' is the function to execute when pressing the button.
 */
const ImportButton = ({text, onPress}: {text: string, onPress: () => void}) => (
  <View>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  </View>
);

/**
 * Component used either for the favorites or the save button.
 * 'id' is the sticker id.
 * 'state' is either 'favorites' or 'saved'.
 * 'icon' is the name of the Ionicons to use.
 * 'color' is the color of the button when it is pressed.
 */
const ButtonState = ({id, state, icon, color}: {id: number, state: "favorites"|"saved", icon: string, color: string}) => {
  const [currentState, setState] = React.useState<boolean>(false);
  // Get current state from database
  React.useEffect (() => {
    fetch(`https://stickerest.herokuapp.com/auth/is-${state}-${id}`)
      .then((result) => result.json())
      .then((result) => setState(result))
      .catch(error => console.log(error));
  }, []);
  // Function called when changing the state
  const changeState = React.useCallback(() => {
    fetch(`https://stickerest.herokuapp.com/auth/${currentState ? 'remove' : 'add'}-${state}-${id}`)
      .then(result => console.log(result))
      .then(() => setState(!currentState))
      .catch(error => console.log(error));
  }, [currentState]);
  // State button component
  return (
    <View>
      <TouchableOpacity onPress={changeState}>
        <Ionicons name={icon} size={40} color={currentState ? color : '#9E9E9E'} />
      </TouchableOpacity>
    </View>
  );
}

// TODO: Remove inline css from here

/**
 * Component used for the top part of the sticker page displaying the sticker info.
 * 'stickerInfo' is the sticker to display.
 */
const StickerPackContainer = ({stickerInfo}: {stickerInfo: Sticker}) => (
  <View style={[singleStickerStyle.packContainer, styles.center, styles.flexRow]}>
    <View style={[singleStickerStyle.containerImage, styles.center, styles.padding]}>
      <Image source={{uri: stickerInfo.logo}} style={singleStickerStyle.imageSize}/>
    </View>
    <View style={[styles.flexColumn, styles.flexFill, styles.paddingSmall]}>
      <Text style= {singleStickerStyle.textBold}>{stickerInfo.name}</Text>
      <Text style= {singleStickerStyle.textThin}>by {stickerInfo.Designer}</Text>
      <Text style= {[singleStickerStyle.textBold, styles.marginTopSmall]}>{stickerInfo.n_stickers}</Text>
      <Text style= {singleStickerStyle.textThin}>Stickers</Text>
      <Text style= {[singleStickerStyle.textBold, styles.marginTopSmall]}>{stickerInfo.nr_downloads}</Text>
      <Text style= {singleStickerStyle.textThin}>Downloads</Text>
    </View>
    <View style={[styles.flexColumn, styles.paddingSmall]}>
      <ButtonState id={stickerInfo.ID} state="favorites" icon='md-heart' color='#F44336'/>
      <ButtonState id={stickerInfo.ID} state="saved" icon='md-bookmark' color='#F5CB08'/>
    </View>
  </View>
);

/**
 * Single sticker page component.
 */
export const SingleSticker = () => {
  //@ts-ignore
  const id = useRoute().params.id;
  // Get currently selected sticker from database
  const [sticker, setSticker] = React.useState<Sticker>();
  const [stickerImage, setStickerImage] = React.useState<StickerImage[]>();
  React.useEffect(() => {
    fetch(`https://stickerest.herokuapp.com/stickers/${id}`)
      .then((result) => result.json())
      .then((result) => setSticker(result[0]));
    fetch(`https://stickerest.herokuapp.com/stickers/images-${id}`)
      .then((result) => result.json())
      .then((result) => setStickerImage(result.slice(1)));
  }, []);
  // Callback function to import stickers into telegram
  const importToTelegram = React.useCallback(() => {
    // TODO: Add sticker name here
    Telegram.importPack('example_one_by_StickerestBot');
  }, []);
  // Used for background image
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  // Single sticker page component
  return (
    <View>
      <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}></ImageBackground>
      <View style={styles.marginTop}>
      {
        sticker !== undefined ? (
          <View style={styles.center}>
            <StickerPackContainer stickerInfo={sticker} />
            <View style={[styles.flexColumn, styles.marginTop]} >
              <ImportButton text={"Import to Whatsapp"} onPress={() => {}} />
              <ImportButton text={"Import to Telegram"} onPress={importToTelegram} />
            </View>
            <View style={[styles.flexRow, styles.marginTop]} >
            {
              stickerImage !== undefined ? <FlexibleAlbum stickers={stickerImage}/> : <Text> A problem occurred while loading the sticker</Text>
            }
            </View>
          </View>
        ) : (
          <Text> A problem occurred while loading the sticker</Text>
        )
      }
      </View>
    </View>
  );
}
