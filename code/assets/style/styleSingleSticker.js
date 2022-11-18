import { StyleSheet } from 'react-native';

const styleSingleSticker = StyleSheet.create({

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
      text_view: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
      }, 
      logo : {
        width: 150,
        height: 150, 
        marginTop: -100,
        marginBottom: 10
      },
      mainStickerView: {
        width: 300,
        height: 200, 
        backgroundColor: '#8D08F5',
        borderRadius: 20,
        shadowColor: '#8D08F5',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      stickerView: {
        width: 120,
        height: 120, 
        backgroundColor: '#8D08F5',
        borderRadius: 20,
        shadowColor: '#8D08F5'
      },
      btnContainer: {
        height: 50,
        backgroundColor: '#F5CB08',
        borderRadius: 10
      }
   
});

export { styleSingleSticker }