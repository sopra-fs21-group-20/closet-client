import React, {useEffect, useRef, useState} from "react";
import {Easing, Animated, View, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import {Octicons} from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";
import LottieView from "lottie-react-native";

function FeedActions({post_id, likes, comments, isLiked, lightTheme, onCommentClick, caption_attrs}) {
    useEffect(() => {
        return () => {
            animationPress();
        };
    }, [isLiked]);

    const animation = useRef(null);
    const animationPress = () => {
        if(animation?.current && !isLiked) {
            animation.current.play();
        }
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={animationPress}>
                <View style={styles.detailsContainer}>
                    <Text
                        style={[styles.text, {color: (lightTheme ? lightThemeStyle.text.color : styles.text.color)}]}>{likes}</Text>
                    <View style={styles.lottieContainer}>
                        <LottieView progress={0.2} autoSize={true} speed={1.5} ref={animation} loop={false} style={styles.lottie} source={(lightTheme ? require("../assets/animations/like-button-dark.json") : require("../assets/animations/like-button-white.json"))} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => {
                onCommentClick(post_id, caption_attrs, lightTheme);
            }}>
                <View style={styles.detailsContainer}>
                    <Text
                        style={[styles.text, {color: (lightTheme ? lightThemeStyle.text.color : styles.text.color)}]}>{comments}</Text>
                    <Octicons
                        name={"comment"}
                        size={25}
                        style={[styles.icon, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        alignItems: "stretch",
        flexDirection: "row",
        padding: 0,
        width: '100%',
        marginTop: 20
    },
    detailsContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 25,
    },
    text: {
        color: colors.white,
        marginRight: 8,
        fontSize: 14,
    },
    icon: {
        color: colors.white,
        marginLeft: 3,
        height: 24
    },
    lottieContainer: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    lottie: {
        width: 100,
        height: 100,
        top: -1
    }
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
