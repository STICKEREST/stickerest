import React, {useEffect, useState} from 'react'
import { Alert, Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native';

import { styles } from "../../assets/style/styleUserProfilePage";

import{ ImagesAssets } from '../../assets/ImagesAssets';

import { ButtonToSign, FieldComponent } from './Access';
import { getData, prepareCredentials, update } from '../../core/access/profile';
import { validateCredentials } from '../../core/access/accessUtilities';
import { User } from '../../core/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const attemptUpdate = (nickname: string): void => {
  if(validateCredentials(nickname)) {
    const form : string = prepareCredentials(nickname);
    updateUI(form);
  }else {
    Alert.alert("Missing information", "Some of the fields are empty");
  }
}

const TextFields = ({email, setEmail, nickname, setNickname} : {email : string, setEmail : any, nickname : string, setNickname : any}) => {

    useEffect(() => {

      getData()
      .then((result : User) => {
        setEmail(result.email);
        setNickname(result.nickname);
      })

    }, [])

    return (
        <SafeAreaView>
            <View style={styles.input_container}>
                <FieldComponent name={nickname} placeholder={null}   setName={setNickname} picture={"person-outline"} hide={false}/>
                <FieldComponent name={email} placeholder={null} setName={setEmail} picture={"mail-outline"} hide={false} disabled={true}/>
            </View>
        </SafeAreaView>
    )
} 

const ButtonUpdate = ({nickname} : {nickname : string}) => {
  return (
    <View style={[styles.style_signInButton, {marginTop: windowHeight*0.07}]}>
      <ButtonToSign functionToExecute={() => attemptUpdate(nickname)} nameOfButton="Save"/>
    </View>
  )
}

export default function UserProfilePage() {
  const [email, setEmail] = React.useState("name.surname@gmail.com");    
  const [nickname, setNickname] = React.useState("nickname");
  return (
    <View style={styles.container}>
          <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={{width: windowWidth, height: windowHeight}}>
            <View style={{alignItems:'center'}}><Text style={[styles.textUserProfile, {paddingTop: windowHeight/6}]}>Your Profile</Text></View>
              <View style={[styles.text_view_login, {marginTop: windowHeight*0.3}]}>
                  <TextFields email={email} setEmail={setEmail} nickname={nickname} setNickname={setNickname} />
                  <ButtonUpdate nickname={nickname}/>
              </View>
          </ImageBackground>
    </View>
  );
}
