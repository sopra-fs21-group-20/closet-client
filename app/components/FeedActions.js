import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import colors from "../config/colors";
import feed from "../api/feed";

function FeedActions({
                         post_id,
                         likes,
                         comments,
                         isLiked,
                         setIsLiked,
                         lightTheme,
                         onCommentClick,
                         captionIsEmpty,
                         caption_attrs,
                     }) {

 /*   const animation = useRef(null);
    const animationPress = () => {
        setLikesNumber(likesNumber + 1);
        setIsLiked(true);
        if (animation?.current && !isLiked) {
            animation.current.play();
        }
        likePost().then(() => {

        });
    }

    const likePost = async () => {
        const result = await feed.likePost(post_id);
    }*/

    return (
        <View style={styles.container}>
            {/*<TouchableOpacity activeOpacity={(hasBeenLiked ? 1 : 0.2)} onPress={
                handleLike
                /*if (!hasBeenLiked && !isLiked) animationPress();*!/>
                <View style={styles.detailsContainer}>
                    <Text
                        style={[styles.text, {color: (lightTheme ? lightThemeStyle.text.color : styles.text.color)}]}>likesNumber</Text>
                    <View style={styles.lottieContainer}>
                        <LottieView progress={(hasBeenLiked) ? 1 : 0.2} autoSize={true} speed={1.5} ref={animation} loop={false} style={styles.lottie} source={(require("../assets/animations/like-button-white.json"))} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={(hasBeenLiked ? 1 : 0.2)} onPress={handleDislike}>
                <View style={styles.detailsContainer}>
                    <AntDesign
                        name={!disliked ? "dislike2" : "dislike1"}
                        size={24}
                        color={lightTheme}
                        style={[styles.icon, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}
                    />
                </View>
            </TouchableOpacity>*/}
            <TouchableOpacity onPress={() => {
                onCommentClick(post_id, caption_attrs, lightTheme);
            }}>
                <View style={styles.detailsContainer}>
                    {/*<Text
                        style={[styles.text, {color: (lightTheme ? lightThemeStyle.text.color : styles.text.color)}]}>comments</Text>*/}
                    <Octicons
                        name={"comment"}
                        size={22}
                        style={[styles.icon]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "stretch",
        flexDirection: "row",
        width: '100%',
    },
    detailsContainer: {
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row",
        marginLeft: 0,
        marginRight: 0,
    },
    text: {
        color: colors.white,
        marginRight: 8,
        fontSize: 14,
    },
    icon: {
        color: colors.dark,
        marginLeft: 3,
        height: 24,
        marginTop: 3,
    },
    lottieContainer: {
        width: 24,
        height: 24,
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
        color: colors.white,
    },
    icon: {
        color: colors.white,
    },
});

export default FeedActions;
