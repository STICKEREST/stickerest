import React, {useEffect, useState} from 'react'
import { Alert, Dimensions, ImageBackground, Linking, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native';

import { styles } from "../../assets/style/styleUserProfilePage";

import{ ImagesAssets } from '../../assets/ImagesAssets';

import { ButtonToSign, FieldComponent, FieldWithHelp } from './Access';
import { getData, prepareCredentials, update } from '../../core/access/profile';
import { validateCredentials } from '../../core/access/accessUtilities';
import { User } from '../../core/types';

import Ionicons from '@expo/vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const stylesDimension = StyleSheet.create({
  fullSize: {
    width: windowWidth, 
    height: windowHeight
  },
  marginHeight: {
    marginTop: windowHeight*0.04,
  },
  marginHeight007: {
    marginTop: windowHeight*0.07,
  },
  marginHeight003: {
    marginTop: windowHeight*0.3,
  },
  paddingHeight: {
    paddingTop: windowHeight/6
  }
});

const updateUI = (form : string) => {

  update(form)
  .then((result : boolean) => {
    if(result === true) {
      Alert.alert("Successful", "The nickname has been updated successfully");
    } else {
      Alert.alert("Error", "Something went wrong during the registration");
    }
  })

}

// TODO: Update the id as well
//TODO : update this attempt as the others
const attemptUpdate = (nickname: string, telegramId : number): void => {
  if(validateCredentials(nickname) && typeof telegramId === "number") {
    const form : string = prepareCredentials(nickname, telegramId);
    updateUI(form);
  }else {
    Alert.alert("Missing information", "Some of the fields are empty");
  }
}

const TextFields = ({email, setEmail, nickname, setNickname, setTelegramId} : {email : string, setEmail : any, nickname : string, setNickname : any, setTelegramId : any}) => {

    useEffect(() => {

      getData()
      .then((result : User) => {
        setEmail(result.email);
        setNickname(result.nickname);
        setTelegramId(result.telegram);

        console.log(result);
      })

    }, [])

    return (
        <SafeAreaView>
            <View style={styles.input_container}>
                <FieldComponent name={nickname} placeholder={null} setName={setNickname} picture={"person-outline"} hide={false}/>
                <FieldComponent name={email} placeholder={null} setName={setEmail} picture={"mail-outline"} hide={false} disabled={true}/>
            </View>
        </SafeAreaView>
    )
}

const ButtonUpdate = ({nickname, telegramId} : {nickname : string, telegramId : number}) => {
  return (
    <View style={[styles.style_signInButton, stylesDimension.marginHeight007]}>
      <ButtonToSign functionToExecute={() => attemptUpdate(nickname, telegramId)} nameOfButton="Save"/>
    </View>
  )
}

export default function UserProfilePage() {
    const [email, setEmail] = React.useState<string>("name.surname@gmail.com");
    const [nickname, setNickname] = React.useState<string>("nickname");
    const [telegramId, setTelegramId] = React.useState<number>(0);
    return (
        <View style={styles.container}>
            <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={stylesDimension.fullSize}>
                <View style={styles.viewYourProfile}>
                    <Text style={[styles.textUserProfile, stylesDimension.paddingHeight]}>Your Profile</Text>
                </View>
                <View style={[styles.text_view_login, stylesDimension.marginHeight003]}>
                    <Text>Personal information</Text>
                    <TextFields email={email} setEmail={setEmail} nickname={nickname} setNickname={setNickname} setTelegramId={setTelegramId} />
                    <Text>Stickers upload</Text>
                    <View style={styles.input_container} >
                        <FieldWithHelp name={telegramId.toString()} setName={(text : string) => {
                          if(Number.isNaN(+text)) 
                            setTelegramId(0); 
                          else
                            setTelegramId(+text); 
                          }} hide={false} placeholder={'Telegram id'} picture={'paper-plane'} message={'This is your unique Telegram Id. It is used to publish sticker packs on Telegram when you upload them on Stickerest. Send a message to @userinfobot to know your id.'} />
                    </View>
                    <ButtonUpdate nickname={nickname} telegramId={telegramId}/>
                </View>
            </ImageBackground>
        </View>
    );
}
