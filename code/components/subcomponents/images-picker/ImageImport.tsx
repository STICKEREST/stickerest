import React, { Dispatch, SetStateAction } from 'react';
import { View, Text } from 'react-native';
import { FlexibleAlbum, FlexibleAlbumAddable } from '../stickers-carousel/FlexibleAlbum';
import * as ImagePicker from 'expo-image-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { StickerImage } from '../../../core/types';

export const ImageImport  = ({imageSource, setImageSource} : {imageSource : string[], setImageSource : Dispatch<SetStateAction<string[]>>}) => {
 
  // const [imageSource, setImageSource] = React.useState<string[]>([]);

  const pickImages = async () => {
    const result : any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 15,
      quality:1,
    })
    if(!result.cancelled) {
    // setImageSource(result.uri ? [result.uri] : result.selected)
      if(result.selected !== undefined) {
        console.log('RESULT: ',result);
        result.selected.map((image : any) => {
          console.log('IMAGE: ',image);
          setImageSource(oldImages => [...oldImages, image.uri]);
        })
      } else {
        setImageSource(oldImages => [...oldImages, result.uri]);
      }
    }
  }

  const deleteImage = (index: number) => {
    console.log(index);
    setImageSource(images => images.filter((image, i) => i !== index));
    //setTags(prevState => prevState.filter((tag, i) => i !== index))
  }

  //  {imageSource && <FlexibleAlbum images={imageSource} addPress={pickImages} onPress={deleteImage} addImages = {true}/>}
  return (
    <View style = {{ alignContent: 'center'}}>
      {imageSource && 
        <FlexibleAlbumAddable 
          stickers={
              imageSource.map((image : string, order : number) : StickerImage => 
              ({ID : order, ordinal_order: order, image_file : image}))} 
          addPress={pickImages} 
          removePress={deleteImage}
        />
      }
    </View>
  ) 
}
