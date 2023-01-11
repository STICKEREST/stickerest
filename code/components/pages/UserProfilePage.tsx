import React, {useEffect, useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native';

import { styles } from "./../../assets/style/styleUserProfilePage";

import{ ImagesAssets } from './../../assets/ImagesAssets';

import ButtonToSign from "./../subcomponents/ButtonToSign"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import FieldComponent from "./../subcomponents/Field";

const handleUpdateUser = (nickname : string) => {

}

const TextFields = ({email, setEmail, nickname, setNickname} : {email : string, setEmail : any, nickname : string, setNickname : any}) => {

    // const [name, setName] = React.useState("name surname");
    // const [email, setEmail] = React.useState("name.surname@gmail.com");    
    // const [nickname, setNickname] = React.useState("nickname");

    useEffect(() => {

      fetch("https://stickerest.herokuapp.com/auth/me")
      .then(response => response.json())
      .then(result => {
        setNickname(result[0].nickname);
        setEmail(result[0].email);
      })

    }, [])

    return (
        <SafeAreaView>
            <View style={styles.input_container}>
                {/* <FieldComponent name={name} placeholder={null} setName={setName} picture={"man-outline"} hide={false}/> */}
                <FieldComponent name={nickname} placeholder={null}   setName={setNickname} picture={"person-outline"} hide={false}/>
                <FieldComponent name={email} placeholder={null} setName={setEmail} picture={"mail-outline"} hide={false}/>
            </View>
        </SafeAreaView>
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
                  <View style={[styles.style_signInButton, {marginTop: windowHeight*0.07}]}>
                    <ButtonToSign functionToExecute={() => handleUpdateUser(nickname)} nameOfButton="Save"/>
                  </View>
              </View>
          </ImageBackground>
    </View>
  );
}
