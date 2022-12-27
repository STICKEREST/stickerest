import React from 'react'
import { Dimensions, TextInput} from 'react-native';
import {View} from 'react-native';

import { styles } from "./../../assets/style/styleLoginRegistrationPage";

import Ionicons from '@expo/vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const generateIcon = (iconName: string) => {
    if (iconName==="md-checkmark-circle")
    {
      return (
        <Ionicons 
            name="md-checkmark-circle" 
            size={30}
            color="black" 
            style={styles.icons_style}
        />
      )
    }
    else if (iconName==="mail-outline")
    {
        return (
            <Ionicons 
                name="mail-outline" 
                size={30} 
                color="black" 
                style={styles.icons_style}
            />
          )
    }
    else if (iconName==="lock-closed-outline")
    {
        return (
            <Ionicons 
                name="lock-closed-outline" 
                size={30} 
                color="black" 
                style={styles.icons_style}
            />
        )
    }
    else if (iconName==="person-outline")
    {
      return (
        <Ionicons 
            name="person-outline" 
            size={30} 
            color="black" 
            style={styles.icons_style}
        />
    )
    }
    else if (iconName==="man-outline")
    {
      return (
        <Ionicons 
            name="man-outline" 
            size={30} 
            color="black" 
            style={styles.icons_style}
        />
    )
    }
  }
  
  export default function FieldComponent({name, placeholder, setName, picture, hide}:{name:string, placeholder:string, setName:any, picture:string, hide:boolean}){
  
    let yellow:string = "#fcf7d9"
    let gray:string = "#f1f1f1"

    let color:string = gray;

    if (name==="")
      color = gray
    else
      color = yellow
  
    return (
        <View style={[styles.inputs, {width: windowWidth*0.8, backgroundColor: color}]}>
            {generateIcon(picture)}
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
  