import { StyleSheet } from 'react-native';

const loadingPageStyle = StyleSheet.create({
  textView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }, // -- The logo --
  logo: {
    width: 220,
    height: 220,
    marginTop: -100,
    marginBottom: 10
  },
  text: {
    fontFamily: "Helvetica-Bold",
    color: 'white',
    fontSize: 47,
  }
});

export { loadingPageStyle }
