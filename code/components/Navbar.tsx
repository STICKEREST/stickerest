import React from "react";
import { View, Button } from "react-native";

import {styles} from "../style";

export default function Navbar() {
    return (
        <View style={styles.flexRow}>
            <View style={styles.expand}>
                <Button title="Home" onPress={() => {}} />
            </View>
            <View style={styles.expand}>
                <Button title="Favourites" onPress={() => {}} />
            </View>
            <View style={styles.expand}>
                <Button title="Settings" onPress={() => {}} />
            </View>
            <View style={styles.expand}>
                <Button title="Users" onPress={() => {}} />
            </View>
        </View>
    );
}
