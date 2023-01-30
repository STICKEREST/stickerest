import { StyleSheet } from 'react-native';


const loginRegistrationPageStyle = StyleSheet.create({
  inputContainer: {
    alignContent: 'space-between',
    marginTop: 20
  },
  // TODO: Same button is used in UserProfilePage (needs better naming)
  signInButton : {
    marginTop: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems:'center',
    alignSelf: 'center'
  },
  logInButton: {
    backgroundColor: "#f5cb08",
    borderRadius: 10,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems:'center',
    alignSelf: 'center',
  },
  logInButtonText: {
    fontSize: 15,
    height: 40,
    color: 'white',
    marginTop: 8,
    fontFamily: "popregular",
  },
  swap: {
    textAlign:'center',
    fontSize: 15
  },
  urlText : {
    color: 'blue',
    textAlign:'center',
    fontSize: 15
  },
  icon: {
    margin: 0,
    padding: 10,
    height: 50,
    alignContent: 'center',
    textAlignVertical: 'center',
    resizeMode: 'contain'
  },
  marginLeft: {
    marginLeft: -50
  },
  inputs: {
    marginBottom: 10,
    borderRadius: 10
  },
  textInput: { //the text inside the TextInput
    textAlignVertical: 'center',
    height: 50,
    margin: 0,
    padding: 10
  }
});

export { loginRegistrationPageStyle }
