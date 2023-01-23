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
    fontSize: 19,
    alignContent: 'stretch',
    fontFamily: "popblack",
    marginLeft: 15,
    marginBottom: 5
  },
  textHeader4: {
    fontSize: 15,
    alignContent: 'stretch',
    fontFamily: "poplight",
    marginLeft: 25,
    marginBottom : 15
  },
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
  }
});

export { styles }
