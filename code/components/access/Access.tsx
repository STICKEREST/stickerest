import React from 'react'
import { Dimensions, TextInput, Image, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';

import { styles } from "./../../assets/style/styleLoginRegistrationPage";

import Ionicons from '@expo/vector-icons/Ionicons';
import { ImagesAssets } from '../../assets/ImagesAssets';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  
export const FieldComponent = ({name, placeholder, setName, picture, hide}:{name:string, placeholder:string, setName:any, picture:string, hide:boolean}) => {
  
    let yellow:string = "#fcf7d9";
    let gray:string = "#f1f1f1";

    let color:string = gray;

    if (name==="")
      color = gray
    else
      color = yellow
  
    return (
        <View style={[styles.inputs, {width: windowWidth*0.8, backgroundColor: color}]}>
            <Ionicons 
            //Unfortuntately here a ts-ignore was needed since creators of Ionicons didn't create a type for that but instead
            //they did that name accepts any of the possible strings names of the icons
            //@ts-ignore
                name={picture} 
                size={30} 
                color="black" 
                style={styles.icons_style}
            />
            <TextInput
                style={[styles.input, {width: windowWidth*0.65}]}
                onChangeText={(text) => {setName(text)}}
                value = {name}
                placeholder={placeholder}
                secureTextEntry={hide}
            />
         </View>
    )
  }

  export const Separator = () => {
    return(
        <View style={{width: windowWidth * 0.7, marginTop: windowHeight * 0.03}}>
            <Image source={ImagesAssets.lines} style={{resizeMode:'contain', width: windowWidth*0.7}}/>
        </View>
    );
  }

  export const AlternativeAccessAction = ({text, action, onActionPress } : {text : string, action : string, onActionPress :any}) => {
    return (
        <View style={{width: windowWidth * 0.7, marginTop: windowHeight * 0.09}}>
            <Text style={styles.SignSwap}>
              {text} &nbsp;&nbsp;
              <Text style={styles.urlText} onPress={onActionPress}>
                {action}
              </Text>
            </Text>
          </View>
    );
  }

  type signFunction = () => void;

  export const ButtonToSign = ({functionToExecute, nameOfButton}:{functionToExecute:signFunction, nameOfButton:string}) => {
    return (
        <TouchableOpacity
            onPress={() => functionToExecute()}
            style={[styles.logInButton, {width: windowWidth/2}]}>
            <Text style={styles.logInButtonFont}>
                {nameOfButton}
            </Text>
        </TouchableOpacity>
    )
}
  
  