import React, { useState } from 'react'
import { Dimensions, ImageBackground, Image, TextInput, Button, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from 'react-native';
import { styleCreatePack } from "../../../assets/style/styleCreatePack";
import { ImagesAssets } from '../../../assets/ImagesAssets';
import {TagInput} from '../../subcomponents/tags-input/TagInput'
import { SmallStickerPackBox } from "../../subcomponents/SmallStickerPack";

let gray = '#f1f1f1'
let purple = '#8D08F5'
const windowWidth = Dimensions.get('window').width;

const handleUploadPack = (name : string, tags : string[]) => {
  let formBody = [];

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
      formBody.push(encodeURIComponent("name") + "=" + encodeURIComponent(name));
    
      console.log(formBody)
    
      //@ts-ignore
      // formBody = formBody.join("&");   
        
      fetch("https://stickerest.herokuapp.com/auth/create-sticker-pack", {
        method: 'POST',
        //@ts-ignore
        body: formBody,//post body 
        headers: {//Header Defination 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      } )
      .then((response) => {
        if(response.status === 201) {
          console.log('Successful creation');

          response.text().then(
            ID => {

              formBody = [];
              formBody.push(encodeURIComponent("ID") + "=" + encodeURIComponent(ID));

              for(let i = 0; i < tags.length; i++)
                formBody.push(encodeURIComponent("tag") + "=" + encodeURIComponent(tags[i]));

              //@ts-ignore
              formBody = formBody.join("&");  

              fetch("https://stickerest.herokuapp.com/auth/add-stickers", {
                method: 'POST',
                //@ts-ignore
                body: formBody,//post body 
                headers: {//Header Defination 
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
              } ).then((response) => {
                if(response.status === 201) {
                } else {
                  console.log('Something went wrong during the publication of the pack');
                    Alert.alert(
                      "Error",
                      "Something went wrong during the publication of the pack",
                      [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                      ]
                    );
                  }

              })
            }
          );

        } else {
          console.log('Something went wrong during the publication of the pack');
          Alert.alert(
            "Error",
            "Something went wrong during the publication of the pack",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      })
      .catch((error) => {
        console.log('Something went wrong during the registration');
        Alert.alert(
          "Error",
            "Something went wrong during the publication of the pack",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      });
  }
}

const UploadButton = ({name, tags}:{name : string, tags : string[]}) => {
  
  return (
      <View>
          <TouchableOpacity  style={{backgroundColor: purple, paddingTop: 8, paddingBottom: 8, borderRadius: 20, width: windowWidth*0.4}} onPress={() => handleUploadPack(name, tags)}>
              <Text style={{color: 'white', fontSize: 16, textAlign:"center"}}>Upload Pack</Text>
          </TouchableOpacity>
      </View>
  )
}

const StickersPreview = () => {
return (
<View>
  <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={{marginRight: 4}}>
                  <SmallStickerPackBox img={ImagesAssets.computer} />
              </View>
              <View style={{marginRight: 4}}>
                  <SmallStickerPackBox img={ImagesAssets.computer}/>
              </View>
              <View style={{marginRight: 4}}>
                  <SmallStickerPackBox img={ImagesAssets.computer}/>
              </View>
  </View>
  <View style={{marginTop: 20, flexDirection: 'row'}}>
              <View style={{marginRight: 4}}>
                  <SmallStickerPackBox img={ImagesAssets.computer} />
              </View>
              <View style={{marginRight: 4}}>
                  <SmallStickerPackBox img={ImagesAssets.computer}/>
              </View>
              <View style={{marginRight: 4}}>
                  <SmallStickerPackBox img={ImagesAssets.computer}/>
              </View>
  </View>
</View>
);
}

const StickerNameInput = ({setName}:{setName : any}) => {
  return (
  <View style={[styleCreatePack.inputs, {backgroundColor: gray}]}>
              <TextInput
                style={[styleCreatePack.input, {width: windowWidth*0.7}]}
                onChangeText={setName}
                placeholder={"Add a name pack"}
              />
       </View>
  );
}

export default function CreatePack() {

  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
//{[styles.inputs, {backgroundColor: color}]}
  return (
    <View style={[styleCreatePack.container]}>
        <View>
            <ImageBackground source={ImagesAssets.rectangleTop} resizeMode="stretch" style={{width: windowWidth, height: windowHeight/8}}/>
        </View>
        <View>
            <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Add your sticker pack</Text>
            <StickerNameInput setName={setName}/> 
            <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Tags</Text> 
            <TagInput tags={tags} setTags={setTags}/>
            <Text style= {{fontSize: 19, alignContent: 'stretch', fontFamily: "popblack"}}>Stickers</Text>
            
        </View>
        <StickersPreview/>
        
      <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
        <UploadButton name={name} tags={tags}/>
      </View>
    </View>
  );
}
