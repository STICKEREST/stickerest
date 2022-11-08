import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

import { ImagesAssets } from '../assets/ImagesAssets';

import {styles} from "../style";

const NabarButton = ({image}:{image: string}) => {
    return (
        <TouchableOpacity style={styles.expand}>
            <Image source={image} style={styles.centered} />
        </TouchableOpacity>
    )
}

export default function Navbar() {
    return (
        <View style={styles.flexRow}>
            <NabarButton image={ImagesAssets.iconHome} />
            <NabarButton image={ImagesAssets.iconStar} />
            <NabarButton image={ImagesAssets.iconSettings} />
            <NabarButton image={ImagesAssets.iconUser} />
        </View>
    );
}