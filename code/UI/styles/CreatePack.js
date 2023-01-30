import { StyleSheet } from 'react-native';


const createPackStyle = StyleSheet.create({
  nameInput: {
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center"
  },
  textUploading: {
    fontSize: 19,
    alignContent: 'stretch',
    fontFamily: "popregular",
    marginTop: 40,
    color: "#8D08F5"
  }
});

export { createPackStyle }
