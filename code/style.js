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
    flexRow: {
        flexDirection: "row"
    },
    expand: {
        flexBasis: "auto",
        flexGrow: 1,
        flexShrink: 0
    },
    centered: {
        alignSelf: "center"
    }
   
});

export { styles }