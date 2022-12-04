import { StyleSheet } from 'react-native';

const styleTagInput = StyleSheet.create({

    container: {
        display: 'flex',
        overflow: 'scroll',
        width: '100%',
        maxWidth: '100%',
        paddingLeft: 14,
        border: '1 grey solid',
        borderRadius: 5,
        color: 'black'
      },
      container_input: {
        width: '100%',
        minWidth: '50%',
        border: 'none',
        borderRadius: 5,
        padding: 14,
        paddingLeft: 14
      },
      tag: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 0,
        marginRight: 10,
        paddingTop: 0, 
        paddingBottom: 10,
        paddingRight: 5,
        border: '1 solid purple',
        borderRadius: 5,
        backgroundColor: 'purple',
        whiteSpace: 'nowrap',
        color: 'white',
        flexDirection:'column',
        justifyContent:'center',
      },
      tag_button: {
        flexDirection:'column',
        display: 'flex',
        padding: 6,
        justifyContent:'center',
        color: 'white'
      },
      tagBox: {
        flex: 1,
        width: 500,
        height: 200,
        minWidth: 500,
        minHeight: 200,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
      },
      tag_buttonLayout: {
        flex: 1,
      }
});

export { styleTagInput }