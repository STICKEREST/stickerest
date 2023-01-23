import { StyleSheet } from 'react-native';


const navbarStyle = StyleSheet.create({
  background: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "#f5cb08",
    paddingBottom: 15,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  expand: {
    flexBasis: "auto",
    flexGrow: 1,
    flexShrink: 0
  },
  circleButton: {
    backgroundColor: "#f5cb08",
    paddingTop: 15,
    marginTop: -60,
    height: 90,
    width: 90,
    borderRadius: 90,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5
  },
  alignCenter: {
    alignSelf: "center"
  }
});

export { navbarStyle }
