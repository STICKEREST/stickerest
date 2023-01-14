import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable, Alert } from 'react-native';

import { styles } from "../../assets/style/styleLoginRegistrationPage";

import{ ImagesAssets } from '../../assets/ImagesAssets';

import { FieldComponent, ButtonToSign, Separator, AlternativeAccessAction } from './Access';

import { validateCredentials } from '../../core/access/accessUtilities';

import { prepareCredentials, registration } from '../../core/access/registration';

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


const registrationUI = (form : string, navigation : any) : void => {

  registration(form)
  .then((result : boolean) => {
    if(result === true) {
      navigation.navigate("LoginPage");
    } else {
      Alert.alert("Error", "Something went wrong during the registration");
    }
  })

}

const attemptSignUp = (email: string, nickname: string, password: string, navigation:any): void => {
  if(validateCredentials(email, nickname, password)) {
    const form : string = prepareCredentials(email, nickname, password);
    registrationUI(form, navigation);
  }else {
    Alert.alert("Missing information", "Some of the fields are empty");
  }
}

const Title = () => {
  return (
    <Text style={[styles.textLogin, {paddingTop: windowHeight/6, width: windowWidth*0.7}]}>
      Create your account
    </Text>
  )
}

const ButtonRegistration = ({email, nickname, password, navigation} : {email : string, nickname : string, password : string, navigation : any}) => {
  return (
    <View style={[styles.style_signInButton, {marginTop: windowHeight*0.04}]}>
      <ButtonToSign functionToExecute={() => attemptSignUp(email, nickname, password,navigation)} nameOfButton="Sign up"/>
    </View>
  )
}

export default function RegistrationPage({navigation}:{navigation:any}) {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.container}>
      <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={{width: windowWidth, height: windowHeight}}>
        <View style={styles.text_view_login}>
          <Title />
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} nickname={nickname} setNickname={setNickname} />
          <ButtonRegistration email={email} nickname={nickname} password={password} navigation={navigation} />
          <Separator />
          <AlternativeAccessAction text = "Already have an account?" action = "Sign In" onActionPress={() => navigation.navigate("LoginPage")}/>
        </View>
      </ImageBackground>
    </View>
  );
}
