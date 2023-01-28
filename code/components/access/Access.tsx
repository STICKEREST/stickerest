import React from 'react'
import { Dimensions, TextInput, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { View, Alert } from 'react-native';

import { styles } from "../../styles/Styles";
import { loginRegistrationPageStyle } from '../../styles/LoginRegistrationPage';

import Ionicons from '@expo/vector-icons/Ionicons';
import { ImagesAssets } from '../../assets/img/ImagesAssets';

/**
 * This class provides general purpose utility UI components that have to deal with forms/accessing/login/...
 */

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styleDimennsion = StyleSheet.create({
  windowHeight08: {
    width: windowWidth*0.8, 
  },
  windowWidth065: {
    width: windowWidth*0.65
  },
  windowWidth07: {
    width: windowWidth*0.7
  },
  separatorSize: {
    width: windowWidth * 0.7, 
    marginTop: windowHeight * 0.03
  },
  imageSeparatorSize: {
    resizeMode:'contain', 
    width: windowWidth*0.7
  },
  actionSize: {
    width: windowWidth * 0.7,
    marginTop: windowHeight * 0.09
  },
  halfWidth: {
    width: windowWidth/2
  }
});

const yellow: string = "#fcf7d9";
const gray: string = "#e1e1e1";

/**
 * Button with help icon with a help message
 */
const HelpOfField = ({messageHelp} : {messageHelp : string}) => (
  <TouchableOpacity onPress={() => Alert.alert('Help', messageHelp)}>
    <Ionicons name={"help-circle-outline"} size={30} color="black" style={[loginRegistrationPageStyle.icon, loginRegistrationPageStyle.marginLeft]} />
  </TouchableOpacity>
)

/**
 * Component that provide a Field input with some possibilities, like icons, being disabled, provide a help message ...
 */
export const FieldComponent = ({name, placeholder, setName, hide, picture = "", messageHelp = "", disabled = false}:{name:string, placeholder:string, setName:any, hide:boolean, picture?:string, messageHelp?:string, disabled?:boolean}) => {
  
  let color: string = name === "" ? gray : yellow;

    return (
        <View style={[styles.flexRow, loginRegistrationPageStyle.inputs, styleDimennsion.windowHeight08, {backgroundColor: color}]}>
            { picture !== "" ? <Ionicons 
            //ignore needed due to name requires not a type of strings but a sequence of their possible strings of icons
            //@ts-ignore
                name={picture} 
                size={30} 
                color="black" 
                style={loginRegistrationPageStyle.icon}
            /> : <></>}
            <TextInput
                style={[loginRegistrationPageStyle.textInput, styleDimennsion.windowWidth065]}
                onChangeText={(text) => {setName(text)}}
                value = {name}
                placeholder={placeholder}
                secureTextEntry={hide}
                editable={!disabled}
            />
            { messageHelp !== "" ? 
              <HelpOfField messageHelp={messageHelp} />
              : <></>}
         </View>
    )
  }

/** 
 * Separator between the form and the alternative action: ----- or -----
 */
export const Separator = () => {
  return(
      <View style={styleDimennsion.separatorSize}>
          <Image source={ImagesAssets.lines} style={styleDimennsion.imageSeparatorSize}/>
      </View>
  );
}

/**
 * Component that provides an alternative for accessing the website, given a test to show and an action to be performed
 * in that case
 */
export const AlternativeAccessAction = ({text, action, onActionPress } : {text : string, action : string, onActionPress :any}) => {
  return (
      <View style={styleDimennsion.actionSize}>
          <Text style={loginRegistrationPageStyle.swap}>
            {text} &nbsp;&nbsp;
            <Text style={loginRegistrationPageStyle.urlText} onPress={onActionPress}>
              {action}
            </Text>
          </Text>
        </View>
  );
}

type signFunction = () => void;
/**
 * Component that provides the button for signing or registering or whatever else
 */
export const ButtonToSign = ({functionToExecute, nameOfButton}:{functionToExecute:signFunction, nameOfButton:string}) => {
  return (
      <TouchableOpacity
          onPress={() => functionToExecute()}
          style={[loginRegistrationPageStyle.logInButton, styleDimennsion.halfWidth]}>
          <Text style={loginRegistrationPageStyle.logInButtonText}>
              {nameOfButton}
          </Text>
      </TouchableOpacity>
  )
}
  
  
