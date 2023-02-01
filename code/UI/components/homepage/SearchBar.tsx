import React from "react";
import { View, TextInput } from "react-native";

import { Feather, Entypo } from "@expo/vector-icons";

import { searchBarStyle } from "../../styles/SearchBar";
import { SetBoolean, SetString } from "../../../core/types";

const SearchField = ({searchText, setSearchText, focused, setFocused}:{searchText : string, setSearchText : SetString, focused : boolean, setFocused : SetBoolean}) => (
  <>
    <TextInput placeholder="Search" value={searchText} onFocus={() => setFocused(true)} onChangeText={setSearchText} style={searchBarStyle.almostFullWidth} />
    {
      /*Show cross icon if the search bar is focused*/
      focused && (
        <Entypo name="cross" size={20} color="black" style={searchBarStyle.smallPadding} onPress={() => setSearchText("")} />
      )
    }
  </>
)

/**
 * Search bar component used in the home page
 */
export const SearchBar = ({searchText, setSearchText}: {searchText: string, setSearchText: SetString}) => {
  const [focused, setFocused] = React.useState<boolean>(false);
  return (
    <View style={[searchBarStyle.searchBar, focused ? searchBarStyle.focused : searchBarStyle.unfocused]}>
      <Feather name="search" size={20} color="black" style={searchBarStyle.smallMargin} />
      <SearchField searchText={searchText} setSearchText={setSearchText} focused = {focused} setFocused = {setFocused} />
    </View>
  );
}
