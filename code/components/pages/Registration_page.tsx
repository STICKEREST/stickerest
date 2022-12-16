import React, {useState} from 'react'
import { Dimensions, ImageBackground, Linking, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "./../../assets/style/styleLoginRegistrationPage";

import{ ImagesAssets } from './../../assets/ImagesAssets';

import { Icon } from '@rneui/themed';
import { setEmitFlags } from 'typescript';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//a component to render the email text field
const EmailField = ({email, setEmail}:{email:string, setEmail:any}) => {


  const [rightAnswer, setRightAnswer] = useState<boolean>(true);

  let yellow:string = "#fcf7d9"
  let gray:string = "#f1f1f1"
  let red:string = "#ffcccc"

  let emptyText:boolean = email===""
  let color = gray;
  
  if (rightAnswer)
    color = emptyText? gray: yellow
  else if (emptyText)
    setRightAnswer(true)
  else
    color = red

  const validateEmail = () => {
    let regexValidMail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let test = regexValidMail.test(email)
    test?setRightAnswer(true):setRightAnswer(false)
  };

  return (
      <View style={[styles.inputs, {backgroundColor: color}]}>
            <Image style={[styles.inputs_picture, {width: 30, height: 30}]}  source={ImagesAssets.mail}/>
              <TextInput
                onBlur={() => validateEmail()}
                style={[styles.input, {width: windowWidth*0.7}]}
                onChangeText={(val)=>setEmail(val)}
                placeholder={"Email"}
              />
       </View>
  )
}

const NicknameField = ({nickname, setNickname}:{nickname:string, setNickname:any}) => {

  // const [text, onChangeText] = React.useState("");

  let yellow:string = "#fcf7d9"
  let gray:string = "#f1f1f1"

  let emptyText:boolean = nickname===""
  let color = gray;
 
  if (emptyText)
    color = gray
  else 
    color = yellow

  return (
      <View style={[styles.inputs, {backgroundColor: color}]}>
        <View style={[styles.inputs_picture, {marginLeft: 7}]}>
            <Icon
              name='user'            
              type='evilicon'
              size={35}
              color="black"
        />
        </View>
              <TextInput
                style={[styles.input, {width: windowWidth*0.7}]}
                onChangeText={(val)=> setNickname(val)}
                placeholder={"Nickname"}
              />
       </View>
  )
}

//a component to render the password test field
const PasswordField = ({password, setPassword}:{password:string, setPassword:any}) => {

  // const [text, onChangeText] = React.useState("");

  const [rightAnswer, setRightAnswer] = useState<boolean>(true);

  let yellow:string = "#fcf7d9"
  let gray:string = "#f1f1f1"
  let red:string = "#ffcccc"

  let emptyText:boolean = password===""
  let color = gray;
  
  if (rightAnswer)
    color = emptyText? gray: yellow
  else if (emptyText)
    setRightAnswer(true)
  else
    color = red

  const validatePassword = () => {
    let regexValidPassword = new RegExp("^(?=.*\d).{4,8}$");
    let test = regexValidPassword.test(password)
    test?setRightAnswer(true):setRightAnswer(false)
  };


  return (
    <View>
      <View style={[styles.inputs, {backgroundColor: color}]}>
            <Image style={[styles.inputs_picture, {width: 30, height: 30}]}  source={ImagesAssets.group}/>
            <TextInput
              secureTextEntry={true}
              onBlur={() => validatePassword()}
              style={[styles.input, {width: windowWidth*0.7}]}
              onChangeText={(val)=>setPassword(val)}
              placeholder={"Password"}
            />
       </View>
       <View style={{width: windowWidth*0.7}}>
        {rightAnswer?null:<Text style={{textAlignVertical: 'center'}}>The password must be at least 4 chars long and contain a digit</Text>}
       </View>
    </View>
  )
}

//this component renders the possibility to enter the mail and the password
const TextFields = ({email, password, setEmail, setPassword, nickname, setNickname} : {email:string, password:string, setEmail:any, setPassword:any, nickname: string, setNickname: any}) => {

  return (
      <SafeAreaView>
          <View style={[styles.input_container, {flexDirection:"column"}]}>
              <EmailField email={email} setEmail={setEmail}/>
              <PasswordField password={password} setPassword={setPassword}/>
              <NicknameField nickname={nickname} setNickname={setNickname}/>
          </View>
      </SafeAreaView>
  )
}

//this component renders the sign up button (not an actual button)
const SignUpButton = ({onSubmit} : {onSubmit : any}) => {
  return (
    <TouchableOpacity
                    onPress={onSubmit}
                    style={[styles.logInButton, {width: windowWidth/2}]}>
                    <Text
                      style={styles.logInButtonFont}>
                      Sign Up
                    </Text>
    </TouchableOpacity>
  )
}



export default function Registration_page() {

  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = (emailSign : string, nickSign :string, pwSign : string) => {


    let formBody = [];
  
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
      else
        console.log('Something went wrong during the registration');
    })
    .catch((error) => {
      console.log('Something went wrong during the registration');
    });
  
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
                  <View style={[styles.style_signInButton, {marginTop: windowHeight*0.07}]}>
                    <SignUpButton onSubmit = {()=>handleSignUp(email,nickname,password)}/>
                  </View>
                  <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.03}}><Image source={ImagesAssets.lines} style={{resizeMode:'contain', width: windowWidth*0.7}}/></View>
                  <View style={{width: windowWidth*0.7, marginTop: windowHeight*0.09}}>
                    <Text style={{textAlign:'center', fontSize: 15}}>Already have an account? <Text></Text>
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
