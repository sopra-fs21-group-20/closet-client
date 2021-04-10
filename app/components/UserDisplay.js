import React, {useEffect, useState} from "react";
import {
    Easing,
    Animated,
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import Text from "./Text";
import colors from "../config/colors";

function UserDisplay({username, profileImage, caption, lightTheme, onCommentClick, post_id, caption_attrs, expandable = false}) {
    const [isOpen, setIsOpen] = useState(false);
    const [spinValue, setSpinValue] = useState(new Animated.Value(0));

    const rotate = () => {
        setIsOpen(!isOpen);
        const toVal = isOpen ? 0 : 0.5;
        Animated.timing(
            spinValue,
            {
                toValue: toVal,
                duration: 300,
                easing: Easing.ease, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
        ).start();
    };

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <TouchableOpacity onPress={() => {

            expandable ? rotate() : onCommentClick(post_id, caption_attrs, lightTheme);
        }}>
            <View style={styles.container}>
                {profileImage && <Image style={styles.profileImage} source={{uri: profileImage}}/>}
                <View style={[styles.detailsContainer, {height: isOpen ? null : 100}]}>
                    <Text style={[styles.username, (lightTheme ? lightThemeStyle.username : null)]} numberOfLines={1}>
                        {username}
                    </Text>
                    {caption && (
                        <Text style={[styles.caption, (lightTheme ? lightThemeStyle.caption : null)]}
                              numberOfLines={isOpen ? 0 : 2}>
                            {caption}
                        </Text>
                    )}
                </View>

                {expandable && (<Animated.View style={{transform: [{rotate: spin}]}}>
                    <MaterialCommunityIcons
                        color={(lightTheme ? lightThemeStyle.chevron.color : styles.chevron.color)}
                        name={"chevron-down"}
                        size={25}
                    />
                </Animated.View>)}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        flexDirection: "row",
        padding: 0,
        width: '100%',
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 20,
        justifyContent: "flex-start",
        paddingBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
    },
    caption: {
        color: colors.white,
    },
    username: {
        fontWeight: "700",
        color: colors.white,
        fontSize: 24,
        marginBottom: 5
    },
    chevron: {
        color: colors.white
    },
});

const lightThemeStyle = StyleSheet.create({
    caption: {
        color: colors.dark,
    },
    username: {
        color: colors.dark,
    },
    chevron: {
        color: colors.dark,
    },
});

export default UserDisplay;
