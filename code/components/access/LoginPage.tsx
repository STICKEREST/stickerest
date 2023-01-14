import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable, Alert } from 'react-native';

import { styles } from "../../assets/style/styleLoginRegistrationPage";

import{ ImagesAssets } from '../../assets/ImagesAssets';

import { FieldComponent, ButtonToSign } from './Access';

import { validateCredentials } from '../../core/access/accessUtilities';
import { prepareCredentials } from '../../core/access/login';

import { login } from '../../core/access/login';

import { AlternativeAccessAction, Separator } from './Access';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const stylesDimension = StyleSheet.create({
  dimensionHeight70: {
    marginTop: windowHeight * 0.07
  },
  fullSize: {
    width: windowWidth, 
    height: windowHeight
  }
});

const TextFields = ({email, password, setEmail, setPassword} : {email : string, password : string, setEmail: any, setPassword : any}) => {

  return (
      <SafeAreaView>
          <View style={styles.input_container}>
              <FieldComponent name={email} placeholder={"email"} setName={setEmail} picture={"mail-outline"} hide={false}/>
              <FieldComponent name={password} placeholder={"password"} setName={setPassword} picture={"lock-closed-outline"} hide={true}/>
          </View>
      </SafeAreaView>
  )
}

const loginUI = (form : string, navigation: any): void => {
  login(form)
  .then((result : boolean) => {
    if(result === true) {
      navigation.navigate("TabNavigator");
    } else {
      Alert.alert("Info wrong", "username or password is not matched");
    }
  })
}

const attemptLogin = (email: string, password: string, navigation: any): void => {
  if(validateCredentials(email, password)) {
    const form : string = prepareCredentials(email, password);
    loginUI(form, navigation);
  } else {
    Alert.alert("Missing information", "Email address and/or password are missing");
  }
}

const Title = () => {
  return (
    <Text style={[styles.textLogin, {paddingTop: windowHeight / 6}]}>
      Log in to your Account
    </Text>
  )
}

const ButtonLogin = ({email, password, navigation} : {email : string, password : string, navigation : any}) => {
  return (
    <View style={[styles.style_signInButton, stylesDimension.dimensionHeight70]}>
      <ButtonToSign functionToExecute={() => attemptLogin(email, password, navigation)} nameOfButton="Sign in"/>
    </View>
  )
}

export default function LoginPage({navigation}:{navigation:any}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  return (
    <View style={styles.container}>
      <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={{width: windowWidth, height: windowHeight}}>
        <View style={styles.text_view_login}>
          <Title />
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
          <ButtonLogin email={email} password={password} navigation={navigation} />
          <Separator />
          <AlternativeAccessAction text = "Don't have an account?" action = "Sign Up" onActionPress={() => navigation.navigate("SignInPage")}/>
        </View>
      </ImageBackground>
    </View>
  );
}
