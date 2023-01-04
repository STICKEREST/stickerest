import React from 'react';
import { TouchableOpacity, View, Image, Button, ImageSourcePropType } from 'react-native';
import { ImagesAssets } from '../../../assets/ImagesAssets';
import { SmallStickerPackBox } from '../SmallStickerPack';
import { FlexibleAlbum } from '../stickers-carousel/FlexibleAlbum';
import * as ImagePicker from 'expo-image-picker';

export default function ImageImport () {
 
  const [imageSource, setImageSource] = React.useState([]);
  
  /*
    ex

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
  */

  const pickImages = async () => {
/*  ImagePicker.openPicker({
    multiple: true,
    waitAnimationEnd: false,
    includeExif: true,
    maxFiles: 15
  }).then(images => {
    images.map(image => {
      setImageSource(oldImages => [...oldImages, image.path]);
    })
    console.log('Images: ', images);
  })
  .catch(e=> console.log('Error', e.message));
*/
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: 15,
    aspect: [4, 4],
    quality:1,
  })
  console.log(result);
  if(!result.canceled) {
    setImageSource(result.uri ? [result.uri] : result.selected)
  }
}

    return (
      <View>
        <TouchableOpacity key={'Select Image'} onPress={pickImages}>
          <SmallStickerPackBox img={ImagesAssets.addIcon}/>
        </TouchableOpacity>
        {imageSource && <FlexibleAlbum images={imageSource} />}
      </View>
    )
  
    /*
        expo-multiple

        
      <ImagePicker
        multiple
        onSave={(assets) => {
          setImageSource(oldImages => [...oldImages, assets]);
          console.log("\nType: " + typeof assets);
        }}
        onCancel={() => {
          alert("Image selection cancelled or permissions needed");
        }}
      />
    */

/*
  ex

   <TouchableOpacity key={'Select Image'} onPress={pickImage}>
      <SmallStickerPackBox img={ImagesAssets.addIcon}/>
    </TouchableOpacity>
    {imageSource && <Image source={{ uri: imageSource }} style={{ width: 200, height: 200 }} />}

*/



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