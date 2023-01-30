import React, { Dispatch, SetStateAction } from 'react';
import { View, Text } from 'react-native';
import { FlexibleAlbum, FlexibleAlbumAddable } from './FlexibleAlbum';
import * as ImagePicker from 'expo-image-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { StickerImage } from '../../core/types';

import { styles } from "../../UI/styles/Styles";

/**
 * This class provides components for Sticker importing / handling exploiting the cross-platform API 
 * to do so
 */

export const ImageImport  = ({imageSource, setImageSource} : {imageSource : string[], setImageSource : Dispatch<SetStateAction<string[]>>}) => {
 
  const pickImages = async () => {
    const result : any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 15,
      quality:1,
    })

    if(!result.cancelled) {
      if(result.selected !== undefined) {
        result.selected.forEach((image : any) => {
          setImageSource(oldImages => [...oldImages, image.uri]);
        })
      } else {
        setImageSource(oldImages => [...oldImages, result.uri]);
      }
    }
  } 

  const fromImageToSticker = (imageSource : string[]) : StickerImage[] => {
    return imageSource.map((image : string, order : number) : StickerImage => 
    ({ID : order, ordinal_order: order, image_file : image}));
  }

  const deleteImage = (index: number) => {
    setImageSource(images => images.filter((image, i) => i !== index));
  }

  return (
    <View>
      {imageSource && 
        <FlexibleAlbumAddable 
          stickers={fromImageToSticker(imageSource)} 
          addPress={pickImages} 
          removePress={deleteImage}
        />
      }
    </View>
  ) 
}
