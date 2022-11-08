import React from 'react'
import { Dimensions, ImageBackground, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "../style";

import{ ImagesAssets } from '../assets/ImagesAssets';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//this component renders the possibility to enter the mail and the password
const TextFields = () => {

  const [text, onChangeText] = React.useState("Useless Text");

  return (
      <SafeAreaView>
          <View style={[styles.input_container, {flexDirection:"column"}]}>
              <View style={styles.inputs}>
                  <Image style={styles.inputs_picture} source={ImagesAssets.mail}/>
                  <TextInput
                    style={[styles.input, {width: windowWidth*0.7}]}
                    onChangeText={onChangeText}
                    placeholder={"Email"}
                  />
              </View>
              <View style={styles.inputs}>
                  <Image style={[styles.inputs_picture, {width: 30, height: 30}]}  source={ImagesAssets.group}/>
                  <TextInput
                    style={[styles.input, {width: windowWidth*0.7}]}
                    onChangeText={onChangeText}
                    placeholder={"Password"}
                  />
              </View>
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
        <ImageBackground source={ImagesAssets.bannerList2} style={{height: windowHeight, width: windowWidth}}>
            <View style={styles.text_view_login}>
                <Text style={[styles.textLogin, {paddingTop: windowHeight/6}]}>Log in to your Account</Text>
                <TextFields/>
                <View style={{marginTop: 20, alignSelf: 'center'}}>
                  <SignInButton/>
                </View>
            </View>
        </ImageBackground>
    </View>
  );
}
