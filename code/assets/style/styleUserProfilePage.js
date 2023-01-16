import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewYourProfile: {
       alignItems:'center',
    },
    //--- the text field for the email and the password ---
    input: { //the text inside the TextInput
        height: 50,
        margin: 0,
        padding: 10,
        textAlignVertical: 'center',
      },
      textUserProfile: {
        fontFamily: "popblack",
        color: 'black',
        fontSize: 35,
      },
      input_container: {
        alignContent: 'space-between',
        alignContent: 'center',
        textAlignVertical: 'center',
        marginTop: 10,
        marginBottom: 20,
        flexDirection:"column"
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
        marginRight: 10,
        alignContent: 'center',
        textAlignVertical: 'center',
        resizeMode: 'contain'
      },
      //--- Sign up button in Login_page ---
      logInButton: { //the button
        backgroundColor: "#f5cb08",
        borderRadius: 10,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems:'center',
        alignSelf: 'center',
      },
      urlText : {
        color: 'blue', 
        textAlign:'center', 
        fontSize: 15
      }, 
      logInButtonFont: { //the text inside the button
        fontSize: 15,
        height: 40,
        color: 'white',
        marginTop: 8,
        fontFamily: "popregular",
      }, 
      style_signInButton : {
        marginTop: 20, 
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems:'center',
        alignSelf: 'center'
        },
     //--- Positioning the background pictures ---
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
});

export { styles }
