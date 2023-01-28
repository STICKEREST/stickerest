import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, TouchableOpacity, Text, View, NativeSyntheticEvent, TextInputChangeEventData, TextInputKeyPressEventData  } from 'react-native';

import { tagInputStyle } from '../styles/TagInput';
import { styles } from '../styles/Styles';


const allowedTagsNmbr = 9;

const TagsContainer = ({tags, setTags, setEdit}:{tags:string[], setTags: Dispatch<SetStateAction<string[]>>, setEdit: Dispatch<SetStateAction<boolean>>}) => {
    const deleteTag = (index : number) => {
      setTags((prevState : string[]) => prevState.filter((tag : string, i : number) => i !== index))
      if(tags.length === allowedTagsNmbr-1) {
        setEdit(false);
      } else {
        setEdit(true);
      }
  };

  return (
    <View style={tagInputStyle.tagsList}>
        {
          tags.map((tag: string, index: number) => (
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
  )
}

const BottomTagsContainer = ({tags, setTags, setEdit}:{tags:string[], setTags: Dispatch<SetStateAction<string[]>>, setEdit: Dispatch<SetStateAction<boolean>>}) => {
  return (
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
  )
}


const TagInput = ({tags, setTags}:{tags:string[], setTags: Dispatch<SetStateAction<string[]>>}) => {

    const [isEditable, setEdit] = React.useState(true)
    
    const [input, setInput] = React.useState('');

    /**
     * Changes the edibility when the maximal number of tags is exceeded 
     */
    function handleTagsNmb () {
      if(tags.length === allowedTagsNmbr-1) {
        setEdit(false);
      } else {
        setEdit(true);
      }
    }

    /**
     * If the user presses ',' or 'Enter' or 'Space', trim and add to the tags array the input text.
     * Then clear the input text and call handleTagsNmb() 
     */
    const handleOnChangeText = (e:NativeSyntheticEvent<TextInputChangeEventData>) => {
    
      const text = e.nativeEvent.text;
      setInput(text);
      if(text.includes(',') || text.includes('Enter') || text.includes(' ')) {
        e.preventDefault();
        const trimmedInput = input.replace(/[|&;$%@"'<>()+,.]/g, "");
        if(trimmedInput != '' && !tags.includes(trimmedInput)) {
          setTags((prevState : string[]) => [...prevState, trimmedInput]);
        }
        setInput('');
        handleTagsNmb();
      }
    };

    /**
     * Pop the last tag added to the tags array when 'Backspace' is pressed.
     * Set the input to the popped tag
     * @param e Key pressed
     */
    const handleOnKeyDown = (e : NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        const {key} = e.nativeEvent;

        if (key === "Backspace" && !input.length && tags.length) {
          e.preventDefault();
          const tagsCopy = [...tags];
          const poppedTag = tagsCopy.pop();
      
          setTags(tagsCopy);
          setInput(poppedTag);
        }
    };
   
  return (
    <View style={styles.margin}>
      <TextInput value={input} placeholder={isEditable ? "Press space or add a comma after each tag" : " "} onKeyPress={handleOnKeyDown} onChange={handleOnChangeText} editable={isEditable} />
      
      <TagsContainer tags={tags} setTags={setTags} setEdit={setEdit} />
      <BottomTagsContainer tags={tags} setTags={setTags} setEdit={setEdit} />

      

    </View>
  );
}

export { TagInput }
