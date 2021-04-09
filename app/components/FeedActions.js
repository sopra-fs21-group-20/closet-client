import React, {useEffect, useState} from "react";
import {Easing, Animated, View, StyleSheet, Image, TouchableWithoutFeedback} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function FeedActions({likes, comments, lightTheme,}) {


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {

            }}>
                <View style={styles.detailsContainer}>
                    <Text style={[styles.text, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}>{likes}</Text>
                    <MaterialCommunityIcons
                        color={(lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}
                        name={"heart-outline"}
                        size={25}
                    />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {

            }}>
                <View style={styles.detailsContainer}>
                    <Text style={[styles.text, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}>{comments}</Text>
                    <MaterialCommunityIcons
                        color={(lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}
                        name={"comment-outline"}
                        size={25}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        padding: 0,
        width: '100%',
        marginTop: 20
    },
    detailsContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 20
    },
    text: {
        color: colors.white,
        marginRight: 5,
    },
    icon: {
        color: colors.white
    },
});

const lightThemeStyle = StyleSheet.create({
    text: {
        color: colors.dark,
    },
    icon: {
        color: colors.dark,
    },
});

export default FeedActions;
