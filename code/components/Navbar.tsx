import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

import { ImagesAssets } from "../assets/ImagesAssets";

import {styles} from "../style";

const NabarButton = ({image}:{image: string}) => {
	return (
		<TouchableOpacity style={styles.expand}>
			<Image source={image} style={styles.centered} />
		</TouchableOpacity>
	);
}

const MiddleButton = ({image}:{image: string}) => {
	return (
		<View style={[navbarStyles.circle, styles.shadow, navbarStyles.button]}>
			<TouchableOpacity>
				<Image source={image} style={[styles.centered]} />
			</TouchableOpacity>
		</View>
	);
}

export default function Navbar() {
	return (
		<View style={[navbarStyles.background, styles.flexRow]}>
			<NabarButton image={ImagesAssets.iconHome} />
			<NabarButton image={ImagesAssets.iconStar} />
			<MiddleButton image={ImagesAssets.iconDocument} />
			<NabarButton image={ImagesAssets.iconSettings} />
			<NabarButton image={ImagesAssets.iconUser} />
		</View>
	);
}

const navbarStyles = StyleSheet.create({
	background: {
		backgroundColor: "#f5cb08",
		paddingTop: 15,
		paddingBottom: 30,
		marginTop: -30,
		borderRadius: 20
	},
	circle: {
		height: 90,
		width: 90,
		borderRadius: 90,
	},
	button: {
		backgroundColor: "#f5cb08",
		paddingTop: 15,
		marginBottom: 60,
		marginTop: -60,
	}
});
