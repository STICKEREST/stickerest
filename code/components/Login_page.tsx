import React from 'react'
import { useState, useEffect } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "../style";

import{ ImagesAssets } from '../assets/ImagesAssets';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EmailField = () => {
  const [text, onChangeText] = React.useState("");

  let yellow:string = "#fcf7d9"
  let gray:string = "#f1f1f1"

  let emptyText:boolean = text===""
  let color = emptyText?gray: yellow

  return (
      <View style={[styles.inputs, {backgroundColor: color}]}>
            <Image style={[styles.inputs_picture, {width: 30, height: 30}]}  source={ImagesAssets.mail}/>
              <TextInput
                style={[styles.input, {width: windowWidth*0.7}]}
                onChangeText={onChangeText}
                placeholder={"Email"}
              />
       </View>
  )
}

const PasswordField = () => {
  const [text, onChangeText] = React.useState("");

  let yellow:string = "#fcf7d9"
  let gray:string = "#f1f1f1"

  let emptyText:boolean = text===""
  let color = emptyText?gray: yellow

  return (
      <View style={[styles.inputs, {backgroundColor: color}]}>
            <Image style={[styles.inputs_picture, {width: 30, height: 30}]}  source={ImagesAssets.group}/>
              <TextInput
                secureTextEntry={true}
                style={[styles.input, {width: windowWidth*0.7}]}
                onChangeText={onChangeText}
                placeholder={"Password"}
              />
       </View>
  )
}

//this component renders the possibility to enter the mail and the password
const TextFields = () => {

  return (
      <SafeAreaView>
          <View style={[styles.input_container, {flexDirection:"column"}]}>
              <EmailField/>
              <PasswordField/>
          </View>
      </SafeAreaView>
  )
}

//this component renders the sign in button (not an actual button)
const SignInButton = () => {
  return (
    <TouchableOpacity
                    onPress={null}
                    style={[styles.logInButton, {width: windowWidth/2}]}>
                    <Text
                      style={styles.logInButtonFont}>
                      Sign In
                    </Text>
    </TouchableOpacity>
  )
}

export default function Login_page() {
  
  const [fontsLoaded] = useFonts({
    'popblack': require('../assets/fonts/poppins/popblack.otf'),
    'poplight': require('../assets/fonts/poppins/Poppins-Light.otf'),
    'popregular': require('../assets/fonts/poppins/Poppins-Regular.otf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
          <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={{width: windowWidth, height: windowHeight}}>
              <View style={styles.text_view_login}>
                  <Text style={[styles.textLogin, {paddingTop: windowHeight/6}]}>Log in to your Account</Text>
                  <TextFields/>
                  <View style={styles.style_signInButton}>
                    <SignInButton/>
                  </View>
              </View>
          </ImageBackground>
    </View>
  );
}
