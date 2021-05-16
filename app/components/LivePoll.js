import React, {useEffect, useRef, useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import colors from "../config/colors";
import feed from "../api/feed";
import * as Progress from 'react-native-progress';

function LivePoll({
                      post_id,
                      likes,
                      dislikes,
                      isLiked,
                      setIsLiked,
                      hasBeenLiked,
                      hasBeenDisliked,
                      lightTheme,
                      captionIsEmpty,
                      caption_attrs
                  }) {

    const [liked, setLiked] = useState(hasBeenLiked);
    const [disliked, setDisliked] = useState(hasBeenDisliked);
    const [progress, setProgress] = useState((likes + dislikes) === 0 ? 0 : likes / (dislikes + likes));
    //this prevents sending multiple requests at once and bombarding our server
    let processingRequest = false;

    const handleRefresh = async () => {
        const result = await feed.getPostPoll(post_id)
        const likes = parseFloat(result.data?.numberOfLikes)
        const dislikes = parseFloat(result.data?.numberOfDislikes)
        const pollRate = likes / (likes + dislikes)
        refreshPoll(pollRate);
    }

    const handleLike = async () => {
        if (processingRequest) {
            return;
        }
        processingRequest = true;
        if (!liked) {
            setLiked(true);
            setDisliked(false);
        } else (setLiked(false));
        await feed.likePost(post_id);
        await handleRefresh();
        processingRequest = false;
    }

    const handleDislike = async () => {
        if (processingRequest) {
            return;
        }
        processingRequest = true;
        if (!disliked) {
            setDisliked(true);
            setLiked(false);
        } else (setDisliked(false));
        await feed.dislikePost(post_id);
        await handleRefresh();
        processingRequest = false;
    }

    const getPollRate = async () => {
        const result = await feed.getPostPoll(post_id);
        const likes = parseFloat(result.data.numberOfLikes);
        const dislikes = parseFloat(result.data.numberOfDislikes);
        return likes / (likes + dislikes);
    }

    const refreshPoll = (rate) => {
        if (rate >= 0) {
            setProgress(rate);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={(hasBeenLiked ? 1 : 0.2)} onPress={handleDislike}>
                <View style={styles.detailsContainer}>
                    <AntDesign
                        name={!disliked ? "dislike2" : "dislike1"}
                        size={24}
                        color={lightTheme}
                        style={[styles.icon, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}
                    />
                </View>
            </TouchableOpacity>
            <Progress.Bar
                progress={progress}
                width={Dimensions.get("window").width - 150}
                color={'white'}
                style={{
                    marginBottom: 0,
                    alignSelf: 'center',
                }}/>
            <TouchableOpacity activeOpacity={(hasBeenLiked ? 1 : 0.2)} onPress={
                handleLike}>
                <View style={styles.detailsContainer}>
                    <AntDesign
                        name={!liked ? "like2" : 'like1'}
                        size={24}
                        color={lightTheme}
                        style={[styles.icon, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: '100%',
    },
    detailsContainer: {
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    text: {
        color: colors.white,
        marginRight: 8,
        fontSize: 14,
    },
    icon: {
        color: colors.lighter,
        marginLeft: 3,
        height: 24
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

export default LivePoll;
