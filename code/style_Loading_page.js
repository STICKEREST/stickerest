import { StyleSheet } from 'react-native';

import{ ImagesAssets } from './assets/ImagesAssets';

const styles = StyleSheet.create({ 
      container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
      }, // -- The logo --
      logo : {
        width: 150,
        height: 150, 
        marginTop: -100,
        marginBottom: 10
      },
      text: {
        fontFamily: "popblack",
        color: 'white',
        fontSize: 40,
      },
});

export { styles }