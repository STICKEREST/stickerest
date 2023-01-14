import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable, Alert } from 'react-native';

import { styles } from "./../../assets/style/styleLoginRegistrationPage";

import{ ImagesAssets } from './../../assets/ImagesAssets';

import FieldComponent from "./../subcomponents/Field"
import ButtonToSign from "./../subcomponents/ButtonToSign"

import Registration_page from './Registration_page';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TextFields = ({email, password, setEmail, setPassword} : {email : string, password : string, setEmail: any, setPassword : any}) => {

  return (
      <SafeAreaView>
          <View style={[styles.input_container, {flexDirection:"column"}]}>
              <FieldComponent name={email} placeholder={"email"} setName={setEmail} picture={"mail-outline"} hide={false}/>
              <FieldComponent name={password} placeholder={"password"} setName={setPassword} picture={"lock-closed-outline"} hide={true}/>
          </View>
      </SafeAreaView>
  )
}

function isEmpty(value: string): boolean {
  return value == null || value.trim() === "";
}

const validateCredentials = (email: string, password: string): boolean => {
  if(isEmpty(email) || isEmpty(password)) {
    Alert.alert("Missing information", "Email address and/or password are missing");
    return false;
  }
  return true;
}

const login = (form: string, navigation: any): void => {
  fetch("https://stickerest.herokuapp.com/users/login", {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json()).then(response => {
    if(response === "Successfully logged in!") {
      console.log(response);
      navigation.navigate("TabNavigator");
    } else if(response.message === "username or password is not matched") {
      // TODO: Better error message?
      Alert.alert("Info wrong", "username or password is not matched");
    }
  }).catch(error => console.log("Error: " + error));
}

const attemptLogin = (email: string, password: string, navigation: any): void => {
  if(validateCredentials(email, password)) {
    email = encodeURIComponent("email") + "=" + encodeURIComponent(email);
    password = encodeURIComponent("password") + "=" + encodeURIComponent(password);
    login(email + "&" + password, navigation);
  }
}

export default function Login_page({navigation}:{navigation:any}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <View style={styles.container}>
      <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={{width: windowWidth, height: windowHeight}}>
        <View style={styles.text_view_login}>
          <Text style={[styles.textLogin, {paddingTop: windowHeight / 6}]}>
            Log in to your Account
          </Text>
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
          <View style={[styles.style_signInButton, {marginTop: windowHeight * 0.07}]}>
            <ButtonToSign functionToExecute={() => attemptLogin(email, password, navigation)} nameOfButton="Sign in"/>
          </View>
          <View style={{width: windowWidth * 0.7, marginTop: windowHeight * 0.03}}>
            <Image source={ImagesAssets.lines} style={{resizeMode:'contain', width: windowWidth*0.7}}/>
          </View>
          <View style={{width: windowWidth * 0.7, marginTop: windowHeight * 0.09}}>
            <Text style={styles.SignSwap}>
              Don't have an account? <Text></Text>
              <Text style={styles.urlText} onPress={() => navigation.navigate("SignInPage")}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
