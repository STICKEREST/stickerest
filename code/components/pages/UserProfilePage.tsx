import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "./../../assets/style/styleUserProfilePage";

import{ ImagesAssets } from './../../assets/ImagesAssets';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type validateFunctionType = (string) => boolean 

const Field = ({input, validate, placeholder, pictureName}: {input:string, validate: validateFunctionType, placeholder:string, pictureName:string}) => {

  const [text, onChangeText] = React.useState(input);

  const [rightAnswer, setRightAnswer] = useState<boolean>(true);

  let yellow:string = "#fcf7d9"
  let gray:string = "#f1f1f1"
  let red:string = "#ffcccc"

  let emptyText:boolean = text===""
  let color = gray;
  
  if (rightAnswer)
    color = emptyText? gray: yellow
  else if (emptyText)
    setRightAnswer(true)
  else
    color = red

  function validateField() {
    let compatibility:boolean = validate(text)
    console.log(compatibility)
    compatibility?setRightAnswer(true):setRightAnswer(false)
  }    

  return (
      <View style={[styles.inputs, {backgroundColor: color}]}>
            <Image style={[styles.inputs_picture, {width: 30, height: 30}]}  source={require('./../../assets/' + pictureName)}/>
              <TextInput
                onBlur={validateField}
                style={[styles.input, {width: windowWidth*0.7}]}
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={text}
              />
       </View>
  )
}

//this component renders the possibility to enter the mail and the password
const TextFields = () => {

    let name = "name surname"
    let username = "namesurxx"
    let dateofbirth = ""
    let email_address = "name.surname@gmail.com"

    function validateEmail (text:string): boolean {
        console.log("I receive " + text)
        let regexValidMail:RegExp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        let test:boolean = regexValidMail.test(text)
        console.log("my regex is wrong")
        return test
    };

    return (
        <SafeAreaView>
            <View style={[styles.input_container, {flexDirection:"column"}]}>
                <Field input={name} validate={() => true} placeholder={"name + surname"} pictureName={"Mail.png"}/>
                <Field input={username} validate={() => true} placeholder={"username"} pictureName={"Mail.png"}/>
                <Field input={email_address} validate={validateEmail} placeholder={"email"} pictureName={"Mail.png"}/>
            </View>
        </SafeAreaView>
    )
}

const SaveButton = () => {
    return (
      <TouchableOpacity
                      onPress={null}
                      style={[styles.logInButton, {width: windowWidth/2}]}>
                      <Text
                        style={styles.logInButtonFont}>
                        Save
                      </Text>
      </TouchableOpacity>
    )
  }
  

export default function UserProfilePage() {
  
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
              <View style={[styles.text_view_login, {marginTop: windowHeight*0.3}]}>
                  <TextFields/>
                  <View style={[styles.style_signInButton, {marginTop: windowHeight*0.07}]}>
                    <SaveButton/>
                  </View>
              </View>
          </ImageBackground>
    </View>
  );
}
