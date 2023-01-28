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

    

// const createTelegramPack = (name : string, idPack : number) => {
//   try {
  
//     getData()
//       .then((result : User) => {
        
//         if(result.telegram === 0)
//           throw new Error("Telegram Id is missing");

//         console.log("\n\n" + idPack + "\n\n");

//         const imagesQuery = `https://stickerest.herokuapp.com/stickers/images-${idPack}`;

//         fetch(imagesQuery)
//         .then(response => { return response.json(); })
//         .then((response ) => {

//           const telegramStickers : Telegram.Sticker[] = response.map((stickerAPI : StickerImage) : Telegram.Sticker => 
//             { return {url: stickerAPI.image_file, emoji: "😀"}; }
//           );

//           const telegramName : string = "stickerest_" + idPack + "_" + name.replace(/\s/g, '');

//           const stickerPackHeader : Telegram.StickerPack = {
//             author: result.telegram /*User id*/,
//             name: telegramName /*Must be unique*/,
//             title: name /*Generic title*/
//           };

//           const [stickerFront, ...restTelegramStickers] = telegramStickers;

//           console.log("\n" + JSON.stringify(stickerPackHeader) + "\n");

//           console.log("\n" + JSON.stringify(stickerFront) + "\n");

//           Telegram.createStickerPack(stickerPackHeader, stickerFront)
//           .then(() => {

//             Promise.all(restTelegramStickers.map((telStick : Telegram.Sticker) => Telegram.addStickerToPack(stickerPackHeader, telStick)))
//             .then(() => {

//               const form : string = (encodeURIComponent("telegramName") + "=" + encodeURIComponent(telegramName));

//               console.log(form);
  
//               fetch(`https://stickerest.herokuapp.com/auth/add-telegram-${idPack}`, {
//                 method: 'POST',
//                 body: form,
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded'
//                 }
//                 }).then(response => response.json()).then(response => {
//                   console.log("Changed telegram ID");
//                 });

//             })
//             .catch(error => console.log(error));

//           })
//           .catch(error => console.log(error));

          

//           //TODO: fare che aggiungo al DB il nick di telegram se no null
//           // poi deve andare su single sticker e se non e' null apre questo stickerpack con il bottone
//           // se no bottone non premibile

//         })

//     })
//     .catch(error => console.log(error));

//   } catch (error) {
//     console.log(error);
//   }

// }

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
      <View style={[styles.centerContent, {paddingLeft: windowWidth/50}]}>
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
