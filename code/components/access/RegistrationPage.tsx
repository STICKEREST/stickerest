import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput, StyleSheet} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable, Alert } from 'react-native';

import { styles } from "../../assets/style/styleLoginRegistrationPage";

import{ ImagesAssets } from '../../assets/img/ImagesAssets';
import { FieldComponent, ButtonToSign, Separator, AlternativeAccessAction } from './Access';

import { validateCredentials } from '../../core/access/accessUtilities';
import { prepareCredentials, registration } from '../../core/access/registration';

import { useNavigation } from '@react-navigation/native';

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

const Title = () => {
  return (
    <Text style={[styles.textLogin, stylesDimension.titleCss]}>
      Create your account
    </Text>
  )
}

const ButtonRegistration = ({registerFunction}: {registerFunction: () => void}) => {
  return (
    <View style={[styles.style_signInButton, stylesDimension.marginHeight]}>
      <ButtonToSign functionToExecute={registerFunction} nameOfButton="Sign up"/>
    </View>
  )
}

export default function RegistrationPage({setLoggedIn}: {setLoggedIn: (value: boolean) => void}) {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const attemptSignUp = React.useCallback(() => {
    async function attempt() {
      try {
        validateCredentials(email, nickname, password);
        const form = prepareCredentials(email, nickname, password);
        await registration(form);
        navigation.navigate("LoginPage");
      } catch(error: any) {
        Alert.alert("Error", error.message);
      }
    }

    attempt();
  }, [email, nickname, password]);
  
  return (
    <View style={styles.container}>
      <ImageBackground source={ImagesAssets.bannerList2} resizeMode="stretch" style={stylesDimension.fullSize}>
        <View style={styles.text_view_login}>
          <Title />
          <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} nickname={nickname} setNickname={setNickname} />
          <ButtonRegistration registerFunction={attemptSignUp} />
          <Separator />
          <AlternativeAccessAction text = "Already have an account?" action = "Sign In" onActionPress={() => navigation.navigate("LoginPage")}/>
        </View>
      </ImageBackground>
    </View>
  );
}
