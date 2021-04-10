import React from "react";
import {View, StyleSheet, Image} from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import moment from "moment";

function Comment({user_id, username, comment, creationDate, profileImage, index, lightThemeEnabled}) {
    const now = moment();
    const createdAt = moment(creationDate);

    console.log(profileImage);

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} source={{uri: profileImage}}/>
            <View style={styles.containerInner}>
                <Text style={[styles.username, (lightThemeEnabled ? lightTheme.username : null)]}>{username}</Text>
                <Text style={[styles.comment, (lightThemeEnabled ? lightTheme.comment : null)]}>{comment}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 15,
    },
    containerInner: {
        marginLeft: 15,
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: colors.light,
    },
    username: {
        color: colors.white,
        fontWeight: "bold",
    },
    comment: {
        color: colors.white,
        marginBottom: 7,
        fontSize: 16
    },
});


const lightTheme = StyleSheet.create({
    username: {
        color: colors.dark,
    },
    comment: {
        color: colors.dark,
    },
});

export default Comment;
