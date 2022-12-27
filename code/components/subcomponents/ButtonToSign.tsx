import React from 'react'
import { Dimensions, TextInput, TouchableOpacity, Text} from 'react-native';
import {View} from 'react-native';

import { styles } from "../../assets/style/styleLoginRegistrationPage";

import Ionicons from '@expo/vector-icons/Ionicons';

type signFunction = () => void

const windowWidth = Dimensions.get('window').width;

export default function ButtonToSign({functionToExecute}:{functionToExecute:signFunction}){
    return (
        <TouchableOpacity
            onPress={() => functionToExecute()}
            style={[styles.logInButton, {width: windowWidth/2}]}>
            <Text style={styles.logInButtonFont}>
                Sign In
            </Text>
        </TouchableOpacity>
    )
}
  