import React, { useState } from 'react'
import { TextInput, TouchableOpacity, TouchableHighlight, Text, View, Button  } from 'react-native';
import { styleTagInput } from '../../../assets/style/styleTagInput';

const TagInput = () => {

    const allowedTagsNmbr = 9;
    const [isEditable, setEdit] = useState(true)

    const [tags, setTags] = useState([]);
    
    const [input, setInput] = useState('');

    function handleTagsNmb (n) {
      if(n === allowedTagsNmbr-1) {
        setEdit(false);
      } else {
        setEdit(true);
      }
    }

    const handleOnChangeText = (e) => {
    
      const text = e.nativeEvent.text;
      console.log("input: "+text);
      //const {value} = e.target;
      setInput(text);
      if(text.includes(',') || text.includes('Enter') || text.includes(' ')) {
        e.preventDefault();
        const trimmedInput = input.replace(/[|&;$%@"'<>()+,]/g, "");
        if(trimmedInput != '' && !tags.includes(trimmedInput)) {
          setTags(prevState => [...prevState, trimmedInput]);
        }
        setInput('');
        handleTagsNmb(tags.length);
      }
    };

    const handleOnKeyDown = (e) => {
       
        console.log("new: " + e.nativeEvent.key)
      
        const {key} = e.nativeEvent;

        if (key === "Backspace" && !input.length && tags.length) {
          e.preventDefault();
          const tagsCopy = [...tags];
          const poppedTag = tagsCopy.pop();
      
          setTags(tagsCopy);
          setInput(poppedTag);
        }
    };

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
        handleTagsNmb(tags.length);
    };
    
    const BottomTagInput = () => { //setTags(prevState => [])
      return (
      <View>
            <Text>{allowedTagsNmbr-tags.length} tags available
            {tags.length === 0 ? null :
            <TouchableOpacity onPress ={() => setTags(prevState => [])}>
              <View><Text>Remove all</Text></View>
            </TouchableOpacity>
            } 
            </Text>
      </View>
      );
    }

    return (
      /*
      <View style={{
        flex: 1,
        width: 500,
        height: 0,
        minWidth: 500,
        minHeight: 200,
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
      }}>
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
        <View style={{
          flex: 1,
          width: 100,
          height: 100,
        }} />
      </View>
    );
  }
};
r
      */
        <View>
          <View>
            {tags.map((tag, index) => (
                <View style={{backgroundColor: '#8D08F5', borderRadius: 20, width: 100, flex: 1,  height: 30}}>
                  
                  <View  style={{flex: 1, flexDirection: 'row', height: 40}}>
                    <View style={{flex: 1}}>
                      <Text style={{color: 'white', fontFamily: 'poplight', fontSize: 14, textAlign:"center"}}>{tag}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <TouchableOpacity onPress ={() => deleteTag(index)}>
                          <Text style={{color: 'white', fontFamily: 'poplight', fontSize: 14, textAlign:"right"}}>x</Text>  
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                /*

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text>4 Views 0 Comments</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{textAlign: 'right'}}>Solve This</Text>
                  </View>
                </View>
                */
            ))}
          </View>
            <TextInput
                value={input}
                placeholder={isEditable ? "Press space or add a comma after each tag" : ""}
                onKeyPress={(e) => handleOnKeyDown(e)}
                onChange={(newText) => handleOnChangeText(newText)}
                editable={isEditable}
            />
            <BottomTagInput/>
        </View>
    )
}

export{TagInput}