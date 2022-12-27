import React from 'react'
import { Dimensions, TextInput, TouchableOpacity, Text} from 'react-native';
import {View} from 'react-native';

import { styles } from "../../assets/style/styleLoginRegistrationPage";

type signFunction = () => void

const windowWidth = Dimensions.get('window').width;

export default function ButtonToSign({functionToExecute, nameOfButton}:{functionToExecute:signFunction, nameOfButton:string}){
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
  