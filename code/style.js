import { StyleSheet } from 'react-native';

import{ ImagesAssets } from './assets/ImagesAssets';

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      backgroundPicture : {
      },
      text: {
        fontFamily: "popblack",
        color: 'white',
        fontSize: 40,
      },
      //-- Positioning the background pictures --
      text_view: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
      }, 
      text_view_login: {
        position: 'absolute', 
        top: 0,
        left: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center',
      }, 
      // -- The logo --
      logo : {
        width: 150,
        height: 150, 
        marginTop: -100,
        marginBottom: 10
      },
      //-- Text used in the Login_page --
      textLogin: {
        fontFamily: "popblack",
        color: 'black',
        fontSize: 35,
      },
      //-- Sign up button in Login_page --
      logInButton: { //the button
        backgroundColor: "#f5cb08",
        borderRadius: 10,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems:'center',
        alignSelf: 'center',
      },
      logInButtonFont: { //the text inside the button
        fontSize: 15,
        height: 40,
        color: 'white',
        marginTop: 8,
        fontFamily: "popregular",
      },
      //-- Email and password TextInput in Login_page --
      input_container: {
        alignContent: 'space-between',
        alignContent: 'center',
        textAlignVertical: 'center',
        marginTop: 20,
      },
      input: { //the text inside the TextInput
        height: 50,
        margin: 0,
        padding: 10,
        textAlignVertical: 'center',
        background: ImagesAssets.logo
      },
      inputs: { //the group of text and icon
        flexDirection: "row",
        marginBottom: 10,
        borderRadius: 10,
      },
      inputs_picture: { //the icon of the mail and the lock
        height: 30,
        width: 30,
        marginTop: 10,
        marginLeft: 10,
        alignContent: 'center',
        textAlignVertical: 'center',
        resizeMode: 'contain'
      },
      style_signInButton : {
        marginTop: 20, 
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems:'center',
        alignSelf: 'center'
      }
});

export { styles }