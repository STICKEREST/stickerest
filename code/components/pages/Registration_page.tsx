import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable, Alert } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "./../../assets/style/styleLoginRegistrationPage";

import{ ImagesAssets } from './../../assets/ImagesAssets';

import FieldComponent from "./../subcomponents/Field"

import ButtonToSign from "./../subcomponents/ButtonToSign"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


//this component renders the possibility to enter the mail and the password
const TextFields = ({email, password, setEmail, setPassword, nickname, setNickname} : {email:string, password:string, setEmail:any, setPassword:any, nickname: string, setNickname: any}) => {

  return (
      <SafeAreaView>
          <View style={[styles.input_container, {flexDirection:"column"}]}>
              <FieldComponent name={email} placeholder={"email"} setName={setEmail} picture={"mail-outline"} hide={false} />
              <FieldComponent name={nickname} placeholder={"nickname"} setName={setNickname} picture={"person-outline"} hide={false} />
              <FieldComponent name={password} placeholder={"password"} setName={setPassword} picture={"lock-closed-outline"} hide={true} />
          </View>
      </SafeAreaView>
  )
}

function isEmpty(value: string): boolean {
  return value == null || value.trim() === "";
}

const validateCredentials = (email: string, nickname: string, password: string): boolean => {
  if(isEmpty(email) || isEmpty(nickname) || isEmpty(password)) {
    Alert.alert("Missing information", "Some of the fields are empty");
    return false;
  }
  return true;
}

const signUp = (form: string, navigation): void => {
  fetch("https://stickerest.herokuapp.com/users/register", {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => response.json()).then(response => {
    if(response.status === 201) {
      console.log("Successful registration");
      // TODO: Does the user need to login after registering?
      navigation.navigate("TabNavigator");
    } else {
      console.log("Error during the registration");
      console.log(response);
      Alert.alert("Error", "Something went wrong during the registration");
    }
  }).catch(error => console.log("Error: " + error));
}

const attemptSignUp = (email: string, nickname: string, password: string, navigation): void => {
  if(validateCredentials(email, nickname, password)) {
    email = encodeURIComponent("email") + "=" + encodeURIComponent(email);
    nickname = encodeURIComponent("nickname") + "=" + encodeURIComponent(nickname);
    password = encodeURIComponent("password") + "=" + encodeURIComponent(password);
    signUp(email + "&" + nickname + "&" + password, navigation);
  }
}

export default function Registration_page({navigation}) {

  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          <Text style={[styles.textLogin, {paddingTop: windowHeight/6, width: windowWidth*0.7}]}>
            Create your account
          </Text>
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} nickname={nickname} setNickname={setNickname} />
          <View style={[styles.style_signInButton, {marginTop: windowHeight*0.04}]}>
            <ButtonToSign functionToExecute={() => attemptSignUp(email, nickname, password)} nameOfButton="sign up"/>
          </View>
          <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.03}}>
            <Image source={ImagesAssets.lines} style={{resizeMode:'contain', width: windowWidth*0.7}} />
          </View>
          <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.09}}>
            <Text style={styles.SignSwap}>
              Already have an account? <Text></Text>
              <Text style={styles.urlText} onPress={() => navigation.navigate("LoginPage")}>
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
