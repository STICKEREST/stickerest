import { StyleSheet } from 'react-native';


const tagInputStyle = StyleSheet.create({
  tagText: {
    color: 'white',
    fontFamily: 'poplight',
    fontSize: 14,
    textAlign: "center"
  }, 
  purple: {
    color: '#8D08F5'
  },
  tagContainer: {
    backgroundColor: '#8D08F5',
    borderRadius: 20,
    alignContent: 'center',
    height: 30,
    margin: 2, 
    padding: 3, 
  },
  tagsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 10,
    minHeight: 130,
    maxHeight: 140,
    padding: 4
  },
  tagFlex: {
    flexDirection: 'row',
    height: 20
  },
  tagsCount: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export { tagInputStyle }
