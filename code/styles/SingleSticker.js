import { StyleSheet } from 'react-native';


const singleStickerStyle = StyleSheet.create({
  button: {
    backgroundColor: '#8D08F5',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    width: 180,
    marginTop: 8
  },
  buttonText: {
    color: 'white',
    fontFamily: 'poplight',
    fontSize: 16,
    textAlign: 'center'
  },
  packContainer: {
    width: 300,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#090909',
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5
  },
  containerImage: {
    width: 130,
    height: 200,
    backgroundColor: '#8D08F5',
    borderRadius: 20,
    shadowColor: '#8D08F5',
    shadowOffset: {
      width: 0,
      height: 0
    },
    elevation: 5
  }
});

export { singleStickerStyle }
