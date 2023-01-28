import React from 'react';
import { TextInput, TouchableOpacity, Text, View  } from 'react-native';

import { tagInputStyle } from '../styles/TagInput';
import { styles } from '../styles/Styles';


const TagInput = ({tags, setTags}:{tags:any, setTags: any}) => {

    const allowedTagsNmbr = 9;
    const [isEditable, setEdit] = React.useState(true)
    
    const [input, setInput] = React.useState('');

    function handleTagsNmb (n:any) {
      if(n === allowedTagsNmbr-1) {
        setEdit(false);
      } else {
        setEdit(true);
      }
    }

    const handleOnChangeText = (e:any) => {
    
      const text = e.nativeEvent.text;
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
  return (
    <View style={styles.margin}>
      <TextInput value={input} placeholder={isEditable ? "Press space or add a comma after each tag" : " "} onKeyPress={handleOnKeyDown} onChange={handleOnChangeText} editable={isEditable} />
      <View style={tagInputStyle.tagsList}>
      {
        tags.map((tag: any, index: any) => (
            <View key={tag} style={[tagInputStyle.tagContainer, {width: tag.length > 3 ? tag.length * 13 : 4 * 13}]}>
              <View style={tagInputStyle.tagFlex}>
                <View style={{flex: tag.length}}>
                  <Text style={tagInputStyle.tagText}>{tag}</Text>
                </View>
                <View style={styles.flexFill}>
                  <TouchableOpacity onPress ={() => deleteTag(index)}>
                    <Text style={tagInputStyle.tagText}>x</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        ))
      }
      </View>
      <View style={tagInputStyle.tagsCount}>
        <View>
          <Text>{allowedTagsNmbr-tags.length} tags available</Text>
        </View>
        <View>
        {
          tags.length === 0 ? null :
            <TouchableOpacity onPress ={() => {
              //@ts-ignore
                setTags(prevState => []);
                setEdit(true);
            }}>
            <Text style={tagInputStyle.purple}>Remove all</Text>
            </TouchableOpacity>
        }
        </View>
      </View>
    </View>
  );
}

export { TagInput }
