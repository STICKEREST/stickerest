import { StyleSheet } from 'react-native';

const styleCreatePack = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
      },
      inputs: { //the group of text and icon
        flexDirection: "row",
        marginBottom: 10,
        borderRadius: 10,
      },
      inputs_picture: { //the icon of the mail and the lock
        marginTop: 10,
        marginLeft: 10,
        alignContent: 'center',
        textAlignVertical: 'center',
        resizeMode: 'contain'
      },
      input: { //the text inside the TextInput
        height: 50,
        margin: 0,
        padding: 10,
        textAlignVertical: 'center',
      }, scrollView: {
        marginHorizontal: 20,
        marginTop: 10, 
        flexDirection: 'row', 
      },
});

export { styleCreatePack }