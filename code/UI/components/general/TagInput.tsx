import React, { Dispatch, SetStateAction } from 'react';
import { TextInput, TouchableOpacity, Text, View, NativeSyntheticEvent, TextInputChangeEventData, TextInputKeyPressEventData  } from 'react-native';

import { tagInputStyle } from '../../styles/TagInput';
import { styles } from '../../styles/Styles';

/**
 * This class provides the UI input tag container with all its functions
 */

const allowedTagsNmbr = 9;

/**
 * UI representation of a tag
 */
const TagUI = ({index, tag, deleteTag} : {index : number, tag : string, deleteTag : (value : number) => void}) => {

  const TagTitle = () => (
    <View style={{flex: tag.length}}>
      <Text style={tagInputStyle.tagText}>{tag}</Text>
    </View>
  )

  const DeleteButton = () => (
    <View style={styles.flexFill}>
      <TouchableOpacity onPress ={() => deleteTag(index)}>
        <Text style={tagInputStyle.tagText}>x</Text>
      </TouchableOpacity>
    </View> 
  )

  return (
    <View key={tag} style={[tagInputStyle.tagContainer, {width: tag.length > 3 ? tag.length * 13 : 4 * 13}]}>
      <View style={tagInputStyle.tagFlex}>
        <TagTitle />
        <DeleteButton />
      </View>
    </View>
  );
}

/**
 * Components that represents a container of tags UI
 */
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
                <TagUI index={index} tag={tag} deleteTag={deleteTag} />
          ))
        }
    </View>
  )
}

/**
 * Component that represents the footer of a container providing information and actions such as counter of 
 * Tags inserted in the container and possibility to remove all of them in once
 */
const FooterTagsContainer = ({tags, setTags, setEdit}:{tags:string[], setTags: Dispatch<SetStateAction<string[]>>, setEdit: Dispatch<SetStateAction<boolean>>}) => {
  
  const RemoveAll = () => (
    <TouchableOpacity onPress ={() => {
        setTags([]);
        setEdit(true);
    }}>
      <Text style={tagInputStyle.purple}>Remove all</Text>
    </TouchableOpacity>
  );

  const Counter = () => (
    <Text>{allowedTagsNmbr-tags.length} tags available</Text>
  );
  
  return (
    <View style={tagInputStyle.tagsCount}>
      <Counter />
      { tags.length === 0 ? <></> : <RemoveAll /> }
    </View>
  );
}

/**
 * Components that allows to insert tag inside the container creating TagUI. It is an input field with special interactions
 */
const InputTagField = ( {tags, setTags, isEditable, setEdit, input, setInput } : {tags : string[], setTags : any, isEditable : boolean, setEdit : any, input : string, setInput : any}) => {

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

  const startingPlaceholder : string = "Press space or add a comma after each tag";

  return (
    <TextInput value={input} placeholder={isEditable ? startingPlaceholder : " "} 
    onKeyPress={handleOnKeyDown} onChange={handleOnChangeText} editable={isEditable} />
  );

}

/**
 * Component that gathers all the other parts and manages the state of the tags themselves and the input where
 * they come from
 */
export const TagInput = ({tags, setTags}:{tags:string[], setTags: Dispatch<SetStateAction<string[]>>}) => {

  const [isEditable, setEdit] = React.useState<boolean>(true);
  const [input, setInput] = React.useState<string>('');
   
  return (
    <View style={styles.margin}>
      <InputTagField tags = {tags} setTags = {setTags} isEditable = {isEditable} setEdit = {setEdit} input = {input} setInput = {setInput} />
      <TagsContainer tags={tags} setTags={setTags} setEdit={setEdit} />
      <FooterTagsContainer tags={tags} setTags={setTags} setEdit={setEdit} />
    </View>
  );
}
