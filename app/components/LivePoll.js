import React, {useEffect, useRef, useState} from "react";
import {Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialCommunityIcons, Octicons} from "@expo/vector-icons";
import colors from "../config/colors";
import feed from "../api/feed";
import * as Progress from 'react-native-progress';
import LottieView from "lottie-react-native";

function LivePoll({
                      liked,
                      disliked,
                      hasBeenLiked,
                      hasBeenDisliked,
                      lightTheme,
                      handleLike,
                      handleDislike,
                      progress,
                      processingRequest
                  }) {



    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={(hasBeenLiked ? 1 : 0.2)} onPress={handleDislike}>
                <View style={styles.detailsContainer}>
                    {processingRequest ?
                        <View style={styles.loading}>
                            <LottieView
                                autoPlay
                                loop={true}
                                source={require("../assets/animations/loader.json")}
                                style={styles.animation}
                            />
                        </View> :
                        <AntDesign
                            name={!disliked ? "dislike2" : "dislike1"}
                            size={24}
                            color={lightTheme}
                            style={[styles.icon, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}
                        />}
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
                    {processingRequest ?
                        <View style={styles.loading}>
                            <LottieView
                                autoPlay
                                loop={true}
                                source={require("../assets/animations/loader.json")}
                                style={styles.animation}
                            />
                        </View> :
                        <AntDesign
                            name={!liked ? "like2" : 'like1'}
                            size={24}
                            color={lightTheme}
                            style={[styles.icon, {color: (lightTheme ? lightThemeStyle.icon.color : styles.icon.color)}]}
                        />}
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
        width: 24,
        height: 24,
        marginBottom: 5,
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
    },
    loading: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        width: 24,
        height: 24,
    },
    animation: {
        width: 100,
    },
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
