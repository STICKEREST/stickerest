import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexFill: {
    flex: 1
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexRowWrap: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flexColumn: {
    flexDirection: 'column'
  },
  padding: {
    padding: 20
  },
  paddingSmall: {
    padding: 5
  },
  marginTop: {
    marginTop: 20
  },
  marginTopSmall: {
    marginTop: 5
  },
  textHeader2: {
    fontSize: 29,
    alignContent: 'stretch',
    fontFamily: "popblack",
    marginLeft: 20,
    marginBottom : 30
  },
  textHeader3: {
    fontSize: 15,
    alignContent: 'stretch',
    fontFamily: "poplight",
    marginLeft: 25,
    marginBottom : 15
  }
});

export { styles }
