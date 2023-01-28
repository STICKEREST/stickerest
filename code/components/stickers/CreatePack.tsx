import React from 'react'
import { Dimensions, ImageBackground, Image, TextInput, Button, TouchableHighlight, TouchableOpacity, Alert, SafeAreaView, Text, View } from 'react-native';

import { styles } from "../../styles/Styles";
import { createPackStyle } from "../../styles/CreatePack";

import { ImagesAssets } from '../../assets/img/ImagesAssets';

import { TagInput } from '../TagInput';
import { ImageImport } from '../ImageImport';

import { Fold } from 'react-native-animated-spinkit';
import { getData } from '../../core/access/profile';
import { StickerImage, User } from '../../core/types';

import * as Telegram from '../../api/Telegram';
import { textChangeRangeIsUnchanged } from 'typescript';
import { UploadingAnimation } from '../general/GeneralComponents';
import { FieldComponent } from '../access/Access';
import { userProfilePageStyle } from '../../styles/UserProfilePage';
import { validateCredentials } from '../../core/access/accessUtilities';
import { prepareCredentials, uploadPack } from '../../core/stickers/createPack';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// TODO: Indentation here needs to be fixed

const handleUploadPack = (name: string, tags: string[], images: string[], setNoUploading: any) => {

  if (!validateCredentials(name, ...tags, ...images)) {
    Alert.alert("Info missing", "Some of the fields are empty, please fill them.");
  } else {

    const formdata : FormData = prepareCredentials(name, tags, images);

    setNoUploading(false);

    uploadPack(formdata, name)
    .then( () => {
      setNoUploading(true);
      Alert.alert("Uploaded!","The Pack has been uploaded succesfully")
    })
    .catch(error => {
      setNoUploading(true); 
      Alert.alert("Error!",error.message);
    }) ;
    
  }
    
}

/**
 * Main body of the CreatePack page.
 * Shown when a sticker pack is not being uploaded
 */
const MainCreatePackPage = ({setNoUploading}: {setNoUploading: (value: boolean) => void}) => {
  const [name, setName] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [imageSource, setImageSource] = React.useState<string[]>([]);
  const uploadStickerPack = () => {
    handleUploadPack(name, tags, imageSource, setNoUploading);
    setName("");
    setTags([]);
    setImageSource([]);
  };
  return (
    <View style={styles.marginTop} >
      <Text style={styles.textHeader3}>Add your sticker pack</Text> 
      <View style={[styles.centerContent, {paddingLeft: windowWidth/25}]}>
        <FieldComponent name={name} placeholder={"Add pack name"} setName={setName} hide={false}/>
      </View>
      <Text style={styles.textHeader3}>Tags</Text>
        <TagInput setTags={setTags} tags={tags}/>
      <Text style={styles.textHeader3}>Stickers</Text>
      <View style={[styles.centerContent, {height: windowHeight*0.225, paddingLeft: windowWidth/50}]}>
        <ImageImport imageSource={imageSource} setImageSource={setImageSource} />
      </View>
      <View style={styles.center} >
        <TouchableOpacity style={styles.button} onPress={uploadStickerPack} >
          <Text style={styles.buttonText} >Upload Sticker Pack</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * CreatePack page compnonent
 */
export default function CreatePack() {
  // TODO: Reverse the logic: it would make more sense if it was "setUploading(true)"
  const [noUploading, setNoUploading] = React.useState<boolean>(true);
  return (
    <View>
      <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
      {
        noUploading ? <MainCreatePackPage setNoUploading={setNoUploading} /> : <UploadingAnimation message = "Uploading..."/>
      }
    </View>
  );
}
