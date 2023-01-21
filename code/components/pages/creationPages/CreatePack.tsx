import React, { useState } from 'react'
import { Dimensions, ImageBackground, Image, TextInput, Button, TouchableHighlight, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Text, View } from 'react-native';
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import { ImagesAssets } from '../../../assets/ImagesAssets';
import {TagInput} from '../../subcomponents/tags-input/TagInput'
import { ImageImport } from '../../subcomponents/images-picker/ImageImport';
import { Fold, Grid, Plane } from 'react-native-animated-spinkit';


let gray = '#f1f1f1'
let purple = '#8D08F5'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const handleUploadPack = (name : string, tags : string[], images : string[], setNoUploading : any) => {
  let formdata = new FormData();

  if (name === "")
  {
    Alert.alert(
      "Info missing",
      "Some of the fields are empty, please fill them.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
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
      } ).then((response) => {

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

const UploadButton = ({name, tags, images, setName, setTags, setImageSource, setNoUploading}:{name : string, tags : string[], images : string[], setName : any, setTags : any, setImageSource : any, setNoUploading : any}) => {
  return (
      <View style = {{}}>
          <TouchableOpacity  
            style={{backgroundColor: purple, paddingTop: 8, paddingBottom: 8, borderRadius: 20, width: windowWidth*0.4}}  
            onPress={() => {
              handleUploadPack(name, tags, images, setNoUploading);
              setName("");
              setTags([]);
              setImageSource([]);
            }}
          >
              <Text style={{color: 'white', fontSize: 16, textAlign:"center"}}>Upload Pack</Text>
          </TouchableOpacity>
      </View>
  )
}


const StickerNameInput = ({name, setName} : {name : string, setName : any}) => {
  return (
  <View style={[styleCreatePack.inputs, {backgroundColor: gray}]}>
              <TextInput
                style={[styleCreatePack.input, {width: windowWidth*0.7}]}
                onChangeText={(text) => {setName(text)}}
                value = {name}
                placeholder={"Add a name pack"}
              />
       </View>
  );
}

export default function CreatePack() {

  
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageSource, setImageSource] = useState<string[]>([]);
  const [noUploading, setNoUploading] = useState<boolean>(true);

//{[styles.inputs, {backgroundColor: color}]}
  return (
    <View style={[styleCreatePack.container, {paddingBottom: (windowHeight/ 8)}]}>
        <View>
            <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
        </View>
        {
          noUploading ?

          <>
            <View>
                <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Add your sticker pack</Text>
                <StickerNameInput name = {name} setName = {setName}/> 
                <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Tags</Text> 
                <TagInput setTags={setTags} tags={tags}/>
                <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Stickers</Text>
            </View>
            <View  style={{height: windowHeight*0.325, alignContent: 'center', marginLeft: windowHeight/22}}>
              <ImageImport imageSource = {imageSource} setImageSource = {setImageSource}/>
            </View>
            <View style={{alignItems: 'center'}}>
                <UploadButton name={name} setName = {setName} tags={tags} setTags = {setTags} images = {imageSource} setImageSource = {setImageSource} setNoUploading = {setNoUploading} />
            </View>
          </>

          :

          <View style = {{height: windowHeight/2, width: windowWidth, alignItems: 'center', justifyContent: 'center'}}>
            <Fold color="#8D08F5" size={48} />
            <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popregular", marginTop: 40, color: "#8D08F5"}}>Uploading...</Text> 
          </View>
        }
        
  </View>
  );
}
