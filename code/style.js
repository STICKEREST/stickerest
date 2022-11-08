import { StyleSheet } from 'react-native';

import{ ImagesAssets } from './assets/ImagesAssets';

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        fontFamily: "popblack",
        color: 'white',
        fontSize: 40,
      },
      textLogin: {
        fontFamily: "popblack",
        color: 'black',
        fontSize: 35,
      },
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
        //top: 60, 
        top: 0,
        left: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center',
        //textAlignVertical: 'top'
      }, 
      logo : {
        width: 150,
        height: 150, 
        marginTop: -100,
        marginBottom: 10
      },
      input: {
        height: 50,
        //backgroundColor: "#f1f1f1",
        margin: 0,
        //borderWidth: 1,
        padding: 10,
        textAlignVertical: 'center',
        background: ImagesAssets.logo
      },
      inputs: {
        flexDirection: "row",
        //paddingBottom: 20,
        marginBottom: 10,
        backgroundColor: "#f1f1f1",
        borderRadius: 10,
        //borderWidth: 1
      },
      inputs_picture: {
        height: 30,
        width: 30,
        marginTop: 10,
        marginLeft: 10,
        alignContent: 'center',
        textAlignVertical: 'center'
      },
      input_container: {
        alignContent: 'space-between',
        alignContent: 'center',
        textAlignVertical: 'center',
        marginTop: 20
      }
});

export { styles }