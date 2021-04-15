import React from "react";
import {View, StyleSheet, Image} from "react-native";

import Text from "./Text";
import colors from "../config/colors";
import moment from "moment";

function Comment({user_id, username, comment, creationDate, profileImage, index, lightThemeEnabled}) {
    const postedAt = moment(creationDate).add(2, "hours").fromNow();

    return (
        <View style={styles.container}>
            <Image style={styles.profileImage} source={{uri: profileImage}}/>
            <View style={styles.containerInner}>
                <Text style={styles.text}>
                    <Text style={[styles.username, (lightThemeEnabled ? lightTheme.username : null)]}>{username}</Text>
                    <Text style={[styles.comment, (lightThemeEnabled ? lightTheme.comment : null)]}>  {comment}</Text>
                </Text>
                <Text style={styles.postedAt}>{postedAt}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginVertical: 15,
        width: "100%",
    },
    containerInner: {
        marginLeft: 30,
        flexDirection: "column",
        flex: 1,
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
        marginLeft: 7,
    },
    postedAt: {
        color: colors.white,
        marginTop: 7,
        fontSize: 12
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
