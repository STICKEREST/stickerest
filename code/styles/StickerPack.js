import { StyleSheet } from 'react-native';


const stickerPackStyle = StyleSheet.create({
  stickerView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#090909',
    shadowOffset: {
      width: 0,
      height: 5
    },
    elevation: 5
  },
  smallSize: {
    width: 95,
    height: 95,
  },
  regularSize: {
    width: 115,
    height: 115
  },
  imageSize: {
    width: 90,
    height: 70
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
