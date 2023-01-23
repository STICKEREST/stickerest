import { StyleSheet } from 'react-native';


const singleStickerStyle = StyleSheet.create({
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
  },
  imageSize: {
    height: 85,
    width: 100
  },
  textBold: {
    fontFamily: "popbold",
    fontSize: 17
  },
  textThin: {
    fontFamily: "poplight",
    fontSize: 13
  }
});

export { singleStickerStyle }
