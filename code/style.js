import { StyleSheet } from 'react-native';

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
      }
   
});

export { styles }