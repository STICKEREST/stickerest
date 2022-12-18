import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable, Alert } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "./../../assets/style/styleLoginRegistrationPage";

import{ ImagesAssets } from './../../assets/ImagesAssets';

import FieldComponent from "./../subcomponents/Field"
import { ExitStatus } from 'typescript';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//this component renders the possibility to enter the mail and the password
const TextFields = ({email, password, setEmail, setPassword} : {email : string, password : string, setEmail: any, setPassword : any}) => {

  return (
      <SafeAreaView>
          <View style={[styles.input_container, {flexDirection:"column"}]}>
              <FieldComponent name={email} placeholder={"email"} setName={setEmail} picture={"mail-outline"}/>
              <FieldComponent name={password} placeholder={"password"} setName={setPassword} picture={"lock-closed-outline"}/>
          </View>
      </SafeAreaView>
  )
}

function isEmpty(stringValue:string): boolean
{
  return stringValue==null || stringValue.trim()===""
}

const  handleLogin = ({emailField, passwordField}:{emailField:string, passwordField:string}) => {

  let formBody = [];

  console.log("email: " + emailField + ", password: " + passwordField)

  if (isEmpty(emailField) || isEmpty(passwordField))
  {
    Alert.alert(
      "Info missing",
      "Email address and/or password are missing, please enter them",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  } else {
      formBody.push(encodeURIComponent("email") + "=" + encodeURIComponent(emailField));
      formBody.push(encodeURIComponent("password") + "=" + encodeURIComponent(passwordField));

      //@ts-ignore
      formBody = formBody.join("&");    

      fetch("https://stickerest.herokuapp.com/users/login", {
        method: 'POST',
        //@ts-ignore
        body: formBody,//post body 
        headers: {//Header Defination 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      } ).then((response) => response.json())
      .then((responseData) => {
          console.log(responseData);
          if (responseData.message==="username or password is not matched")
          { 
              Alert.alert(
                "Info wrong",
                "username or password is not matched",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
          }
      })
      .catch((error) => {
          console.log("Error: " + error);
      });
  }

}

export default function Login_page() {

  const SignInButton = () => {
    return (
      <TouchableOpacity
            onPress={startHandlingData}
            style={[styles.logInButton, {width: windowWidth/2}]}>
            <Text
              style={styles.logInButtonFont}>
              Sign In
            </Text>
      </TouchableOpacity>
    )
  }

  function startHandlingData()
  {
    handleLogin({emailField: email, passwordField: password})
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const [fontsLoaded] = useFonts({
    'popblack': require('./../../assets/fonts/poppins/popblack.otf'),
    'poplight': require('./../../assets/fonts/poppins/Poppins-Light.otf'),
    'popregular': require('./../../assets/fonts/poppins/Poppins-Regular.otf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
          <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={{width: windowWidth, height: windowHeight}}>
              <View style={styles.text_view_login}>
                  <Text style={[styles.textLogin, {paddingTop: windowHeight/6}]}>Log in to your Account</Text>
                  <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>
                  <View style={[styles.style_signInButton, {marginTop: windowHeight*0.07}]}>
                    <SignInButton/>
                  </View>
                  <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.03}}><Image source={ImagesAssets.lines} style={{resizeMode:'contain', width: windowWidth*0.7}}/></View>
                  <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.09}}>
                    <Text style={{textAlign:'center', fontSize: 15}}>Don't have an account? <Text></Text>
                    <Text style={styles.urlText}
                          onPress={() => Linking.openURL('http://google.com')}>
                      Sign Up
                    </Text>
                    </Text>
                  </View>
              </View>
          </ImageBackground>
    </View>
  );
}
