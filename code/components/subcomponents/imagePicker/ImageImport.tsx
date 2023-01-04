import React from 'react';
import { View } from 'react-native';
import { FlexibleAlbum } from '../stickers-carousel/FlexibleAlbum';
import * as ImagePicker from 'expo-image-picker';

export default function ImageImport () {
 
  const [imageSource, setImageSource] = React.useState([]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 15,
      quality:1,
    })
    if(!result.cancelled) {
    // setImageSource(result.uri ? [result.uri] : result.selected)
      if(result.selected != undefined) {
        result.selected.map(image => {
          setImageSource(oldImages => [...oldImages, image]);
        })
      } else {
        setImageSource(oldImages => [...oldImages, result]);
      }
    }
  }

  return (
    <View>
      {imageSource && <FlexibleAlbum images={imageSource} onPress={pickImages} addImages = {true}/>}
    </View>
  )
}