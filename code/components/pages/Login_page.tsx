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

/**
 * Function to check if a string is null or empty
 */
const isNullOrEmpty = (value: string): boolean => value == null || value.trim() === "";

/**
 * Function that validates credentials.
 * Throws an error if the credentials are not valid.
 */
const validateCredentials = async (email: string, password: string): void => {
  if(isNullOrEmpty(email) || isNullOrEmpty(password)) {
    throw new Error("Email address and/or password are missing");
  }
}

/**
 * Login function.
 */
const login = async (email: string, password: string): void => {
  email = encodeURIComponent("email") + "=" + encodeURIComponent(email);
  password = encodeURIComponent("password") + "=" + encodeURIComponent(password);
  await fetch("https://stickerest.herokuapp.com/users/login", {
    method: 'POST',
    body: email + "&" + password,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json()).then(response => {
    if(response === "Successfully logged in!") {
      console.log(response);
    } else if(response.message === "username or password is not matched") {
      throw new Error("Username or password is not matched");
    }
  });
}

export default function Login_page({navigation, setLoggedIn}: {setLoggedIn: (value: boolean) => void}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const attemptLogin = React.useCallback(() => {
    async function attempt() {
      try {
        await validateCredentials(email, password);
        await login(email, password);
        console.log("User is now logged in");
        setLoggedIn(true);
      } catch(error: Error) {
        Alert.alert("Error", error.message);
      }
    }
    attempt();
  });
  return (
    <View style={styles.container}>
      <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={{width: windowWidth, height: windowHeight}}>
        <View style={styles.text_view_login}>
          <Text style={[styles.textLogin, {paddingTop: windowHeight / 6}]}>
            Log in to your Account
          </Text>
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
          <View style={[styles.style_signInButton, {marginTop: windowHeight * 0.07}]}>
            <ButtonToSign functionToExecute={attemptLogin} nameOfButton="Sign in"/>
          </View>
          <View style={{width: windowWidth * 0.7, marginTop: windowHeight * 0.03}}>
            <Image source={ImagesAssets.lines} style={{resizeMode:'contain', width: windowWidth*0.7}}/>
          </View>
          <View style={{width: windowWidth * 0.7, marginTop: windowHeight * 0.09}}>
            <Text style={styles.SignSwap}>
              Don't have an account? <Text></Text>
              <Text style={styles.urlText} onPress={() => navigation.navigate("SignUpPage")}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
