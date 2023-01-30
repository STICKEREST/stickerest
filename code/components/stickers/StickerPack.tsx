import * as React from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { StickerPack } from '../../core/types';
import { singleStickerStyle } from '../../styles/SingleSticker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { stickerPackStyle } from '../../styles/StickerPack';
import { styles } from '../../styles/Styles';
import { useEffect } from 'react';
import { changeState, getState } from '../../core/stickers/stickerState';

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

/**
 * Component that shows the sticker pack as a big pack, divided in three columns, one for the image,
 * one for the complete information of that pack (not just the name) and the last one for buttons which
 * can represent a state of the sticker, like if it is liked by the user, saved or other things if needed
 */
export const DetailedBigStickerPack = ({stickerInfo}: {stickerInfo: StickerPack}) => {

  const ButtonState = ({id, stateType, icon, color}: {id: number, stateType: "favorites"|"saved", icon: string, color: string}) => {
    const [currentState, setState] = React.useState<boolean>(false);
    // Get current state from database
    useEffect (() => {
      console.log("Gettings current sticker state...");
      getState(stateType, id)
      .then((actualState : boolean) => setState(actualState))
      .catch(error => Alert.alert("Error", error.message));
    }, []);

    // Function called when changing the state
    const changeStateUI = (currentState : boolean, stateType : string, id : number) => {
      console.log("Updating sticker state...");
      changeState(currentState, stateType, id)
      .then((actualState : boolean) => setState(actualState))
      .catch(error => Alert.alert("Error", error.message));
    };

    // State button component
    return (
      <View>
        <TouchableOpacity onPress={() => changeStateUI(currentState, stateType, id)}>
          <Ionicons 
          //@ts-ignore
          name={icon} size={40} color={currentState ? color : '#9E9E9E'} />
        </TouchableOpacity>
      </View>
    );
  }

  const LogoSection = ({image} : {image : string}) => (
      <View style={[singleStickerStyle.containerImage, styles.center, styles.padding]}>
        <Image source={{uri: image}} style={singleStickerStyle.imageSize}/>
      </View>
  );

  const InfoSection = ({stickerInfo} : {stickerInfo : StickerPack}) => (
      <View style={[styles.flexColumn, styles.flexFill, styles.paddingSmall]}>
        <Text style= {singleStickerStyle.textBold}>{stickerInfo.name}</Text>
        <Text style= {singleStickerStyle.textThin}>by {stickerInfo.Designer}</Text>
        <Text style= {[singleStickerStyle.textBold, styles.marginTopSmall]}>{stickerInfo.n_stickers}</Text>
        <Text style= {singleStickerStyle.textThin}>Stickers</Text>
        <Text style= {[singleStickerStyle.textBold, styles.marginTopSmall]}>{stickerInfo.nr_downloads}</Text>
        <Text style= {singleStickerStyle.textThin}>Downloads</Text>
      </View>
  );

  const ButtonStateSection = ({idPack} : {idPack : number}) => (
      <View style={[styles.flexColumn, styles.paddingSmall]}>
        <ButtonState id={idPack} stateType="favorites" icon='md-heart' color='#F44336' />
        <ButtonState id={idPack} stateType="saved" icon='md-bookmark' color='#F5CB08' />
      </View>
  )

  return (
    <View style={[singleStickerStyle.packContainer, styles.center, styles.flexRow]}>
      <LogoSection image = {stickerInfo.logo}/>
      <InfoSection stickerInfo = {stickerInfo}/>
      <ButtonStateSection idPack = {stickerInfo.ID}/>
    </View>
  );
}
