import React, {useState} from 'react'
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import { Text, View, Alert } from 'react-native';

import { styles } from "../../styles/Styles";
import { loginRegistrationPageStyle } from '../../styles/LoginRegistrationPage';

import{ ImagesAssets } from '../../../assets/img/ImagesAssets';
import { FieldComponent, ButtonToSign, Separator, AlternativeAccessAction } from './Access';

import { validateCredentials } from '../../../core/access/accessUtilities';
import { prepareCredentials, registration } from '../../../core/access/registration';

import { useNavigation } from '@react-navigation/native';
import { errorAlert } from '../general/GeneralComponents';
import { SetString } from '../../../core/types';

/**
 * This class takes care of the UI implementation of the Signup
 */

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const stylesDimension = StyleSheet.create({
  fullSize: {
    width: windowWidth, 
    height: windowHeight
  },
  titleCss: {
    paddingTop: windowHeight/6, 
    width: windowWidth*0.7
  },
  marginHeight: {
    marginTop: windowHeight*0.04,
  }
});

const TextFields = ({email, password, setEmail, setPassword, nickname, setNickname} : {email:string, password:string, setEmail:SetString, setPassword:SetString, nickname: string, setNickname: SetString}) => {

  return (
      <SafeAreaView>
          <View style={[styles.center, styles.flexColumn, loginRegistrationPageStyle.inputContainer]} >
              <FieldComponent name={email} placeholder={"email"} setName={setEmail} picture={"mail-outline"} hide={false} />
              <FieldComponent name={nickname} placeholder={"nickname"} setName={setNickname} picture={"person-outline"} hide={false} />
              <FieldComponent name={password} placeholder={"password"} setName={setPassword} picture={"lock-closed-outline"} hide={true} />
          </View>
      </SafeAreaView>
  )
}

const Title = () => {
  return (
    <Text style={[styles.textHeader1, stylesDimension.titleCss]}>
      Create your account
    </Text>
  )
}

const ButtonRegistration = ({registerFunction}: {registerFunction: VoidFunction}) => {
  return (
    <View style={[loginRegistrationPageStyle.signInButton, stylesDimension.marginHeight]}>
      <ButtonToSign functionToExecute={registerFunction} nameOfButton="Sign up"/>
    </View>
  )
}

export default function RegistrationPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const attemptSignUp = async() => {
    try {
      console.log("Attempting sign up...");
      validateCredentials(email, nickname, password);
      const form = prepareCredentials(email, nickname, password);
      await registration(form);
      console.log("User is now signed up");
      //@ts-ignore
      navigation.navigate("LoginPage");
    } catch(error) {
      errorAlert(error.message);
      console.log("Sign up error: " + error.message);
    }
  };
  return (
    <View style={[styles.center, styles.whiteBackground]} >
      <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={stylesDimension.fullSize}>
        <View style={styles.absolutePosition}>
          <Title />
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} nickname={nickname} setNickname={setNickname} />
          <ButtonRegistration registerFunction={attemptSignUp} />
          <Separator />
          <AlternativeAccessAction text = "Already have an account?" action = "Sign In" onActionPress={
            () => 
            //@ts-ignore
            navigation.navigate("LoginPage")}/>
        </View>
      </ImageBackground>
    </View>
  );
}
