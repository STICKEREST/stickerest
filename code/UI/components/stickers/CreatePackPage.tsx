import React, { Dispatch, SetStateAction } from 'react'
import { Dimensions, ImageBackground, Image, TextInput, Button, TouchableHighlight, TouchableOpacity, Alert, SafeAreaView, Text, View } from 'react-native';

import { styles } from "../../styles/Styles";

import { ImagesAssets } from '../../../assets/img/ImagesAssets';

import { TagInput } from '../general/TagInput';
import { ImageImport } from '../general/ImageImport';
import { errorAlert, successAlert, UploadingAnimation } from '../general/GeneralComponents';
import { FieldComponent } from '../access/Access';
import { validateCredentials } from '../../../core/access/accessUtilities';
import { prepareCredentials, uploadPack } from '../../../core/stickers/createPack';
import { SetBoolean, SetString, SetStringArray, VoidFunction } from '../../../core/types';

/**
 * This class provides the Page for uploading stickers
 */

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
 * This function manages the uploading pack from a UI point of view linking everything necessary present in the core
 * and showing Alerts based on the result
 */
const handleUploadPack = (name: string, tags: string[], images: string[], setUploading: SetBoolean) => {

  if (!validateCredentials(name, ...tags, ...images)) {
    errorAlert("Missing information! Some of the fields are empty");    
  } else {

    const formdata : FormData = prepareCredentials(name, tags, images);

    setUploading(true);
    console.log("Uploading sticker pack...");

    uploadPack(formdata, name)
    .then( () => {
      setUploading(false);
      successAlert("The Pack has been uploaded succesfully")
    })
    .catch(error => {
      setUploading(false); 
      errorAlert(error.message);
    }) ;
    
  }
    
}

const TextFields = ({name, setName} : {name : string, setName: SetString}) => (
  <>
    <Text style={styles.textHeader3}>Add your sticker pack</Text> 
    <View style={[styles.centerContent, {paddingLeft: windowWidth/25}]}>
      <FieldComponent name={name} placeholder={"Add pack name"} setName={setName} hide={false}/>
    </View>
  </>
)

const Tags = ({tags, setTags} : {tags : string[], setTags : SetStringArray}) => (
  <>
    <Text style={styles.textHeader3}>Tags</Text>
    <TagInput setTags={setTags} tags={tags}/>
  </>
)

const Stickers = ({imageSource, setImageSource} : {imageSource : string[], setImageSource : SetStringArray}) => (
  <>
    <Text style={styles.textHeader3}>Stickers</Text>
    <View style={[styles.centerContent, {height: windowHeight*0.225, paddingLeft: windowWidth/50}]}>
      <ImageImport imageSource={imageSource} setImageSource={setImageSource} />
    </View>
  </>
)

const UploadButton = ({uploadStickerPack} : {uploadStickerPack : VoidFunction}) => (
  <View style={styles.center} >
    <TouchableOpacity style={styles.button} onPress={uploadStickerPack} >
      <Text style={styles.buttonText} >Upload Sticker Pack</Text>
    </TouchableOpacity>
  </View>
)

/**
 * Main body of the CreatePack page.
 * Shown when a sticker pack is not being uploaded
 */
const MainCreatePackPage = ({setUploading}: {setUploading: SetBoolean}) => {
  const [name, setName] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [imageSource, setImageSource] = React.useState<string[]>([]);
  const uploadStickerPack = () => {
    handleUploadPack(name, tags, imageSource, setUploading);
    setName("");
    setTags([]);
    setImageSource([]);
  };
  return (
    <View style={styles.marginTop} >
      <TextFields name = {name} setName = {setName} />
      <Tags tags = {tags} setTags = {setTags} />
      <Stickers imageSource={imageSource} setImageSource={setImageSource} />
      <UploadButton uploadStickerPack={uploadStickerPack} />
    </View>
  );
}

/**
 * CreatePack page component
 */
export default function CreatePack() {
  
  const [uploading, setUploading] = React.useState<boolean>(false);
  return (
    <View>
      <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
      {
        uploading ? <UploadingAnimation message = "Uploading..."/> : <MainCreatePackPage setUploading={setUploading} />
      }
    </View>
  );
}
