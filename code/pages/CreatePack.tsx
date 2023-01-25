import React from 'react'
import { Dimensions, ImageBackground, Image, TextInput, Button, TouchableHighlight, TouchableOpacity, Alert, SafeAreaView, Text, View } from 'react-native';

import { styles } from "../styles/Styles";
import { createPackStyle } from "../styles/CreatePack";

import { ImagesAssets } from '../assets/ImagesAssets';

import { TagInput } from '../components/TagInput';
import { ImageImport } from '../components/ImageImport';

import { Fold, Grid, Plane } from 'react-native-animated-spinkit';

// import * as Telegram from '../../../api/Telegram';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// TODO: Indentation here needs to be fixed

const handleUploadPack = (name: string, tags: string[], images: string[], setNoUploading: any) => {
  // TODO: Upload pack on Telegram
  // Telegram.createStickerPack({
  //   author: 0 /*User id*/,
  //   name: name /*Must be unique*/,
  //   title: "" /*Generic title*/
  // }, {
  //   url: "" /*Sticker image url*/,
  //   emoji: "😀"
  // });
  let formdata = new FormData();

  if (name === "") {
    Alert.alert(
      "Info missing",
      "Some of the fields are empty, please fill them.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  } else {
    formdata.append("name", name);

    for(let i = 0; i < tags.length; i++)
      formdata.append("tag",tags[i]);

    for(let i = 0; i < images.length; i++) {
      const uri = images[i];
      const name = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(name);
      const type = match ? `image/${match[1]}` : `image`;
      // {uri: uri, name: name, type : type}
      //@ts-ignore
      formdata.append("image"+i, {uri: uri, name: name, type: type});
    }
    console.log(formdata);

    setNoUploading(false);

    fetch("https://stickerest.herokuapp.com/auth/create-sticker-pack", {
      method: 'POST',
      body: formdata,//post body
      headers: {//Header Defination
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {

        setNoUploading(true);

        if(response.status === 200 || response.status === 201) {

          console.log('Pack Uploaded Successfully');
          Alert.alert(
            "Uploaded!",
            "The Pack has been uploaded succesfully",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );

        } else {
          console.log('Something went wrong during the publication of the pack ' + "\n\n\n" + JSON.stringify(response));
            Alert.alert(
              "Error",
              "Something went wrong during the publication of the pack",
              [
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
          }

      }) //TODO: unify catch with else error message
      .catch(error => {console.log(error); setNoUploading(true);});


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
      <TextInput style={createPackStyle.nameInput} onChangeText={setName} value={name} placeholder={"Add pack name"} />
      <Text style={styles.textHeader3}>Tags</Text>
      <TagInput setTags={setTags} tags={tags}/>
      <Text style={styles.textHeader3}>Stickers</Text>
      <View style={[styles.centerContent, {height: windowHeight*0.225, paddingLeft: windowWidth/25}]}>
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
 * Component shown when uploading a sticker
 */
const UploadingAnimation = () => (
  <View style={[styles.center, {marginTop: windowHeight / 8}]} >
    <Fold color="#8D08F5" size={48} />
    <Text style= {createPackStyle.textUploading}>Uploading...</Text>
  </View>
);

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
        noUploading ? <MainCreatePackPage setNoUploading={setNoUploading} /> : <UploadingAnimation/>
      }
    </View>
  );
}
