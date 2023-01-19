import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import React from "react";

// SearchBar used in Homepage.
export const SearchBar = ({searchText, setSearchText} : {searchText : string, setSearchText : any}) => {
	const [focused, setFocused] = useState(false);
	return (
		<View style={[styles.searchBar, focused ? styles.focused : styles.unfocused]}>
			<Feather name="search" size={20} color="black" style={styles.smallMargin} />
			<TextInput placeholder="Search" value={searchText} onFocus={() => setFocused(true)} onChangeText={setSearchText} style={styles.almostFullWidth} />
			{
				/*Show cross icon if the search bar is focused*/
				focused && (
					<Entypo name="cross" size={20} color="black" style={styles.smallPadding} onPress={() => setSearchText("")} />
				)
			}
		</View>
	);
}

const styles = StyleSheet.create({
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
