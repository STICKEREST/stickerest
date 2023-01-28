import { StyleSheet } from 'react-native';


const userProfilePageStyle = StyleSheet.create({
  inputContainer: {
    alignContent: 'space-between',
    flexDirection:"column",
    marginTop: 10,
    marginBottom: 20
  },
  signInButton : {
    marginTop: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems:'center',
    alignSelf: 'center'
  }
});

export { userProfilePageStyle }
