import React from "react";
import {StyleSheet, View} from "react-native";

import Text from "../Text";
import colors from "../../config/colors";

import defaultStyles from "../../config/styles";

function ProfileBar({ children, style, ...otherProps }) {
    return (
        <View style={styles.container}>
            <View style={styles.barSections}>
                <Text style={styles.numbers}>100M</Text>
                <Text style={styles.tagline}>Followers</Text>
            </View>
            <View style={styles.barSections}>
                <Text style={styles.numbers}>99</Text>
                <Text style={styles.tagline}>Following</Text>
            </View>
            <View style={styles.barSections}>
                <Text style={styles.numbers}>99</Text>
                <Text style={styles.tagline}>Posts</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        height: 60,
        width: '100%',
    },
    barSections:{
        justifyContent: "center",
        alignItems: 'center',
        flex: 1,
    },
    numbers:{
        fontWeight: 'bold',
    },
    tagline:{
        fontSize: 16,
    },
})

export default ProfileBar;
