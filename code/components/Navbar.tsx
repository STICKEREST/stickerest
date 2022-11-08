import React from "react";
import { View, Button, TouchableOpacity, Image } from "react-native";

import {styles} from "../style";

export default function Navbar() {
    return (
        <View style={styles.flexRow}>
            <TouchableOpacity style={styles.expand}>
                <Image source={require("../assets/icons/home.png")} style={styles.centered} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.expand}>
                <Image source={require("../assets/icons/star.png")} style={styles.centered} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.expand}>
                <Image source={require("../assets/icons/settings.png")} style={styles.centered} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.expand}>
                <Image source={require("../assets/icons/user.png")} style={styles.centered} />
            </TouchableOpacity>
        </View>
    );
}
