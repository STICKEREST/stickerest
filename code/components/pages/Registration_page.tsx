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

function isEmpty(stringValue:string): boolean
{
  return stringValue==null || stringValue.trim()===""
}

const handleSignUp = (emailSign : string, nickSign :string, pwSign : string) => {


  let formBody = [];

  console.log("email: " + emailSign)

  if (isEmpty(emailSign) || isEmpty(nickSign) || isEmpty(pwSign))
  {
    Alert.alert(
      "Info missing",
      "Some of the fields are empty, please fill them.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  } else {
      formBody.push(encodeURIComponent("email") + "=" + encodeURIComponent(emailSign));
      formBody.push(encodeURIComponent("nickname") + "=" + encodeURIComponent(nickSign));
      formBody.push(encodeURIComponent("password") + "=" + encodeURIComponent(pwSign));
    
      console.log(formBody)
      
    
      //@ts-ignore
      formBody = formBody.join("&");    
    
      fetch("https://stickerest.herokuapp.com/users/register", {
        method: 'POST',
        //@ts-ignore
        body: formBody,//post body 
        headers: {//Header Defination 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      } )
      .then((response) => {
        if(response.status === 201)
          console.log('Successful registration');
        else {
          console.log('Something went wrong during the registration');
          Alert.alert(
            "Error",
            "Something went wrong during the registration. Please try again and control that you are not already registered.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
        }
      })
      .catch((error) => {
        console.log('Something went wrong during the registration');
        Alert.alert(
          "Error",
          "Something went wrong during the registration. Please try again and control that you are not already registered.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      });
  }

}


export default function Registration_page() {

  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function startHandlingData()
  {
    handleSignUp(email, nickname, password)
  }
  
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
                  <Text style={[styles.textLogin, {paddingTop: windowHeight/6, width: windowWidth*0.7}]}>Create your account</Text>
                  <TextFields email={email} password={password} setEmail={setEmail} setPassword={setPassword} nickname={nickname} setNickname={setNickname}/>
                  <View style={[styles.style_signInButton, {marginTop: windowHeight*0.04}]}>
                    <ButtonToSign functionToExecute={() => startHandlingData()}/>
                  </View>
                  <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.03}}><Image source={ImagesAssets.lines} style={{resizeMode:'contain', width: windowWidth*0.7}}/></View>
                  <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.09}}>
                    <Text style={{textAlign:'center', fontSize: 15}}>Already have an account? <Text></Text>
                    <Text style={styles.urlText}
                          onPress={() => Linking.openURL('http://google.com')}>
                      Sign In
                    </Text>
                    </Text>
                  </View>
              </View>
          </ImageBackground>
    </View>
  );
}
