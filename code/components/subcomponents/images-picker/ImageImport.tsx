import React from 'react';
import { View, Text } from 'react-native';
import { FlexibleAlbum } from '../stickers-carousel/FlexibleAlbum';
import * as ImagePicker from 'expo-image-picker';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function ImageImport () {
 
  const [imageSource, setImageSource] = React.useState<string[]>([]);

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
        console.log('RESULT: ',result);
        result.selected.map(image => {
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
    <View>
      {imageSource && <FlexibleAlbum images={imageSource} addPress={pickImages} onPress={deleteImage} addImages = {true}/>}
    </View>
  )
}

/*
      <TouchableHighlight onPress={pickImages}>
        <Text>s
        </Text>
      </TouchableHighlight>
*/