import React from 'react'
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import { Text, View, Alert } from 'react-native';

import { styles } from "../../styles/Styles";
import { loginRegistrationPageStyle } from '../../styles/LoginRegistrationPage';

import{ ImagesAssets } from '../../../assets/img/ImagesAssets';

import { FieldComponent, ButtonToSign } from './Access';

import { validateCredentials } from '../../../core/access/accessUtilities';
import { prepareCredentials, login } from '../../../core/access/login';

import { AlternativeAccessAction, Separator } from './Access';

import { useNavigation } from '@react-navigation/native';
import { errorAlert } from '../general/GeneralComponents';

/**
 * This class takes care of the UI implementation of the Login
 */

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
          <View style={[styles.center, styles.flexColumn, loginRegistrationPageStyle.inputContainer]}>
              <FieldComponent name={email} placeholder={"email"} setName={setEmail} picture={"mail-outline"} hide={false}/>
              <FieldComponent name={password} placeholder={"password"} setName={setPassword} picture={"lock-closed-outline"} hide={true}/>
          </View>
      </SafeAreaView>
  )
}

const Title = () => {
  return (
    <Text style={[styles.textHeader1, {paddingTop: windowHeight / 6}]}>
      Log in to your Account
    </Text>
  )
}

const ButtonLogin = ({loginFunction} : {loginFunction: () => void}) => {
  return (
    <View style={[loginRegistrationPageStyle.signInButton, stylesDimension.dimensionHeight70]}>
      <ButtonToSign functionToExecute={loginFunction} nameOfButton="Sign in"/>
    </View>
  )
}

export default function LoginPage({setLoggedIn}: {setLoggedIn: (value: boolean) => void}) {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const attemptLogin = async() => {
    try {
      console.log("Attempting login...");
      validateCredentials(email, password);
      const form = prepareCredentials(email, password);
      await login(form);
      setLoggedIn(true);
      console.log("User is now logged in");
    } catch(error) {
      errorAlert(error.message);
      console.log("Login error: " + error.message);
    }
  };
  return (
    <View style={[styles.center, styles.whiteBackground]} >
      <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={stylesDimension.fullSize}>
        <View style={styles.absolutePosition}>
          <Title />
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} />
          <ButtonLogin loginFunction={attemptLogin} />
          <Separator />
          <AlternativeAccessAction text = "Don't have an account?" action = "Sign Up" onActionPress={() => navigation.navigate("SignUpPage")}/>
        </View>
      </ImageBackground>
    </View>
  );
}
