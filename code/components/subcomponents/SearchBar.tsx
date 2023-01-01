import { React, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

// SearchBar used in Homepage.
export const SearchBar = () => {
	const [focused, setFocused] = useState(false);
	const [text, setText] = useState("");
	return (
		<View style={[styles.searchBar, focused ? styles.focused : styles.unfocused]}>
			<Feather name="search" size={20} color="black" style={styles.smallMargin} />
			<TextInput placeholder="Search" value={text} onFocus={() => setFocused(true)} onChangeText={setText} style={styles.almostFullWidth} />
			{
				/*Show cross icon if the search bar is focused*/
				focused && (
					<Entypo name="cross" size={20} color="black" style={styles.smallPadding} onPress={() => setText("")} />
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
