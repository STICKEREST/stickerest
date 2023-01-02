import React from 'react';
import { TouchableOpacity, View, Image, Button, ImageSourcePropType } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagesAssets } from '../../../assets/ImagesAssets';
import { SmallStickerPackBox } from '../SmallStickerPack';


export default function ImageImport () {
 
  const [imageSource, setImageSource] = React.useState();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageSource(result.assets[0].uri);
    }
  };
/*
    const options = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    }

    async function onButtonPress (options) {
        await ImagePicker.launchImageLibrary(options, setResponse);
    }
*/
return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <TouchableOpacity key={'Select Image'} onPress={pickImage}>
      <SmallStickerPackBox img={ImagesAssets.addIcon}/>
    </TouchableOpacity>
    {imageSource && <Image source={{ uri: imageSource }} style={{ width: 200, height: 200 }} />}
  </View>
);
//  {imageSource && <FlexibleAlbum images={[ImagesAssets.addIcon, ...imageSource]}/>}
//  {imageSource && <Image source={{ uri: imageSource[0] }} style={{ width: 200, height: 200 }} />}


/*
    return (
      <View>
        <View>
          <TouchableOpacity key={'Select Image'} onPress={() => pickImage}>
            <View style={{marginRight: 4}}>
                <SmallStickerPackBox img={ImagesAssets.addIcon}/>
            </View>
          </TouchableOpacity>
        </View>
        {imageSource && <SmallStickerPackBox img={{ uri: imageSource }} />}
      </View>
    )
}

// {imageSource && <SmallStickerPackBox img={{uri: imageSource}}/>}
*/
}