import React, { useState } from 'react'
import { TextInput, TouchableOpacity, Text, View, Dimensions  } from 'react-native';
import { styleTagInput } from '../../../assets/style/styleTagInput';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TagInput = ({tags, setTags}:{tags:any, setTags: any}) => {

    const allowedTagsNmbr = 9;
    const [isEditable, setEdit] = useState(true)
    
    const [input, setInput] = useState('');

    function handleTagsNmb (n:any) {
      if(n === allowedTagsNmbr-1) {
        setEdit(false);
      } else {
        setEdit(true);
      }
    }

    const handleOnChangeText = (e:any) => {
    
      const text = e.nativeEvent.text;
      //const {value} = e.target;
      setInput(text);
      if(text.includes(',') || text.includes('Enter') || text.includes(' ')) {
        e.preventDefault();
        const trimmedInput = input.replace(/[|&;$%@"'<>()+,]/g, "");
        if(trimmedInput != '' && !tags.includes(trimmedInput)) {
          setTags((prevState : any) => [...prevState, trimmedInput]);
        }
        setInput('');
        handleTagsNmb(tags.length);
      }
    };

    const handleOnKeyDown = (e : any) => {
       
      
        const {key} = e.nativeEvent;

        if (key === "Backspace" && !input.length && tags.length) {
          e.preventDefault();
          const tagsCopy = [...tags];
          const poppedTag = tagsCopy.pop();
      
          setTags(tagsCopy);
          setInput(poppedTag);
        }
    };

    const deleteTag = (index : any) => {
        setTags((prevState : any) => prevState.filter((tag : any, i : any) => i !== index))
        handleTagsNmb(tags.length);
    };
    
    const BottomTagInput = () => {
      return (
      <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
            <Text>{allowedTagsNmbr-tags.length} tags available</Text>
        </View>
        <View>
            {tags.length === 0 ? null :
            <TouchableOpacity onPress ={() => {
              //@ts-ignore
                setTags(prevState => []);
                setEdit(true);
            }}>
              <View><Text style={{color: '#8D08F5'}}>Remove all</Text></View>
            </TouchableOpacity>
            } 
        </View>
      </View>
      );
    }
// tag.length>3? tag.length*13 : 4*13
    return (

        <View>
          <TextInput
                value={input}
                placeholder={isEditable ? "Press space or add a comma after each tag" : " "}
                onKeyPress={(e) => handleOnKeyDown(e)}
                onChange={(newText) => handleOnChangeText(newText)}
                editable={isEditable}
            />
            
          <View style={{flexWrap: 'wrap', flexDirection: 'row', borderWidth:1.5, borderColor:'black', borderRadius: 10, minHeight: 130, maxHeight: 140, width: windowWidth*0.8, padding: 4}}>
          
            {tags.map((tag : any, index : any) => (
                <View key={tag} style={{backgroundColor: '#8D08F5', borderRadius: 20, width: tag.length>3? tag.length*13 : 4*13, height: 30, margin: 2, padding: 3, alignContent: 'center'}}>
                  <View  style={{flexDirection: 'row', height: 20}}>
                    <View style={{flex: tag.length}}>
                      <Text style={{color: 'white', fontFamily: 'poplight', fontSize: 14, textAlign:"center"}}>{tag}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity onPress ={() => deleteTag(index)}>
                        <Text style={{color: 'white', fontFamily: 'poplight', fontSize: 14, textAlign:"center"}}>x</Text>  
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
            ))}
          </View>
            
            <BottomTagInput/>
        </View>
    )
}

export{TagInput}