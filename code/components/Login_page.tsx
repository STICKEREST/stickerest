import React from 'react'
import { Dimensions, ImageBackground, SafeAreaView, TextInput} from 'react-native';
import { Text, View, Image } from 'react-native';

import { useFonts } from 'expo-font';

import { styles } from "../style";

import{ ImagesAssets } from '../assets/ImagesAssets';

export default function Login_page() {

  const [text, onChangeText] = React.useState("Useless Text");
  
  const [fontsLoaded] = useFonts({
    'popblack': require('../assets/fonts/poppins/popblack.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
        <ImageBackground source={ImagesAssets.bannerList2} style={{height: windowHeight, width: windowWidth}}>
            <View style={styles.text_view_login}>
                <Text style={[styles.textLogin, {paddingTop: windowHeight/6}]}>Log in to your Account</Text>

                <SafeAreaView>
                   <View style={[styles.input_container, {flexDirection:"column"}]}>
                        <View style={styles.inputs}>
                            <Image style={styles.inputs_picture} source={ImagesAssets.mail}/>
                            <TextInput
                              style={[styles.input, {width: windowWidth*0.7}]}
                              onChangeText={onChangeText}
                              placeholder={"Email"}
                            />
                        </View>
                        <View style={styles.inputs}>
                            <Image style={[styles.inputs_picture, {width: 30, height: 30}]}  source={ImagesAssets.group}/>
                            <TextInput
                              style={[styles.input, {width: windowWidth*0.7}]}
                              onChangeText={onChangeText}
                              placeholder={"Email"}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </ImageBackground>
    </View>
  );
}
