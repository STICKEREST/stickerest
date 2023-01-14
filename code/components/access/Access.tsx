import React from 'react'
import { Dimensions, TextInput, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { View, Alert } from 'react-native';

import { styles } from "./../../assets/style/styleLoginRegistrationPage";

import Ionicons from '@expo/vector-icons/Ionicons';
import { ImagesAssets } from '../../assets/ImagesAssets';

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
const gray: string = "#f1f1f1";

export const FieldComponent = ({name, placeholder, setName, picture, hide, disabled = false}:{name:string, placeholder:string, setName:any, picture:string, hide:boolean, disabled?:boolean}) => {
  
  let color: string = name === "" ? gray : yellow;

    return (
        <View style={[styles.inputs, styleDimennsion.windowHeight08, {backgroundColor: color}]}>
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
                style={[styles.input, styleDimennsion.windowWidth065]}
                onChangeText={(text) => {setName(text)}}
                value = {name}
                placeholder={placeholder}
                secureTextEntry={hide}
                editable={!disabled}
            />
         </View>
    )
  }

export const FieldWithHelp = ({name, placeholder, setName, picture, hide, disabled = false, message}:{name:string, placeholder:string, setName:any, picture:string, hide:boolean, disabled?:boolean, message: string}) => {
  const color: string = name === "" ? gray : yellow;
  return (
    <View style={[styles.inputs, styleDimennsion.windowHeight08, {backgroundColor: color}]}>
      <Ionicons /*@ts-ignore*/name={picture} size={30} color="black" style={styles.icons_style} />
      <TextInput style={[styles.input, styleDimennsion.windowWidth065]} onChangeText={(text) => {setName(text)}} value = {name} placeholder={placeholder} secureTextEntry={hide} editable={!disabled} maxLength={16} />
      <TouchableOpacity onPress={() => Alert.alert('Help', message)}>
        <Ionicons name={"help-circle-outline"} size={30} color="black" style={styles.helpButton} />
      </TouchableOpacity>
    </View>
  );
}

  export const Separator = () => {
    return(
        <View style={styleDimennsion.separatorSize}>
            <Image source={ImagesAssets.lines} style={styleDimennsion.imageSeparatorSize}/>
        </View>
    );
  }

  export const AlternativeAccessAction = ({text, action, onActionPress } : {text : string, action : string, onActionPress :any}) => {
    return (
        <View style={styleDimennsion.actionSize}>
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
            style={[styles.logInButton, styleDimennsion.halfWidth]}>
            <Text style={styles.logInButtonFont}>
                {nameOfButton}
            </Text>
        </TouchableOpacity>
    )
}
  
  
