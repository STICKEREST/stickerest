import { StyleSheet } from 'react-native';


const searchBarStyle = StyleSheet.create({
  searchBar: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center"
  },
  unfocused: {

  },
  focused: {
    justifyContent: "space-evenly"
  },
  smallMargin: {
    marginLeft: 1
  },
  smallPadding: {
    paddingLeft: 1
  },
  almostFullWidth: {
    marginLeft: 10,
    width: "90%"
  }
});

export { searchBarStyle }
