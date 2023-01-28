import React from 'react'
import { Dimensions, ImageBackground, Image, TextInput, Button, TouchableHighlight, TouchableOpacity, Alert, SafeAreaView, Text, View } from 'react-native';

import { styles } from "../../styles/Styles";
import { createPackStyle } from "../../styles/CreatePack";

import { Fold } from 'react-native-animated-spinkit';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/**
* Component shown when uploading a sticker
*/
export const UploadingAnimation = ({message} : {message : string}) => (
 <View style={[styles.center, {marginTop: windowHeight / 8}]} >
   <Fold color="#8D08F5" size={48} />
   <Text style= {createPackStyle.textUploading}>{message}</Text>
 </View>
);