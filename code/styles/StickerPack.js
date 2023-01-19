import { StyleSheet } from 'react-native';


const stickerPackStyle = StyleSheet.create({
  whiteBackground: {
    backgroundColor: '#fff'
  },
  purpleBackground: {
    backgroundColor: '#8D08F5'
  },
  stickerView: {
    borderRadius: 20,
    shadowColor: '#090909',
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 5
  },
  largeSize: {
    width: 300,
    height: 200
  },
  smallSize: {
    width: 95,
    height: 95,
  },
  regularSize: {
    width: 115,
    height: 115
  },
  largeImage: {
    height: 100,
    width: 110
  },
  imageSize: {
    width: 90,
    height: 70
  },
  largeTitle: {
    fontFamily: "popbold",
    fontSize: 24,
    color: "white"
  },
  packTitle: {
    fontFamily: "popblack",
    fontSize: 15,
    marginTop: 8
  },
  packDownloads: {
    fontFamily: "poplight",
    fontSize: 12,
    marginTop: 4
  }
});

export { stickerPackStyle }
