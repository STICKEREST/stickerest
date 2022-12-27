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
  }
  
  export default function Login_page({name, placeholder, setName, picture, hide}:{name:string, placeholder:string, setName:any, picture:string, hide:boolean}){
  
    let yellow:string = "#fcf7d9"
    let gray:string = "#f1f1f1"
  
    let emptyText:boolean = name===""
    let color = gray;
    
    if (emptyText)
      color = gray
    else
      color = yellow
  
    return (
        <View style={[styles.inputs, {backgroundColor: color}]}>
            {generateIcon(picture)}
            <TextInput
                style={[styles.input, {width: windowWidth*0.65}]}
                onChangeText={(value) => setName(value)}
                placeholder={placeholder}
                secureTextEntry={hide}
            />
         </View>
    )
  }
  