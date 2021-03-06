import React, {useCallback, useEffect, useState} from "react";
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
import Image2 from "./Image";

function UserDisplay({
                         username,
                         profileImage = "",
                         caption = "",
                         lightTheme,
                         onCommentClick,
                         post_id,
                         caption_attrs,
                         expandable = false
                     }) {
    const [isOpen, setIsOpen] = useState((!expandable && caption !== ""));
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

    const [captionHeight, setCaptionHeight] = useState(60);

    const onTextLayout = useCallback(e => {
        e.nativeEvent.lines.length >= 2 ? setCaptionHeight(60) : setCaptionHeight(35);
    }, []);

    return (
        <TouchableOpacity onPress={() => {

            expandable ? rotate() : onCommentClick(post_id, caption_attrs, lightTheme);
        }}>
            <View style={styles.container}>
                <Image2 style={styles.profileImage} source={(profileImage) ? {uri: profileImage} : null}/>
                <View style={[styles.detailsContainer, {height: isOpen ? captionHeight + 40 : null}]}>
                    <Text style={[styles.username, (lightTheme ? lightThemeStyle.username : null)]} numberOfLines={1}>
                        {username}
                    </Text>
                    {caption !== "" && (
                        <Text style={[styles.caption, (lightTheme ? lightThemeStyle.caption : null), {height: isOpen ? captionHeight : null}]}
                              numberOfLines={isOpen && expandable ? 0 : 2} onTextLayout={onTextLayout}>
                            {caption}
                        </Text>
                    )}
                </View>

                {expandable && captionHeight === 60 && (<Animated.View style={{transform: [{rotate: spin}]}}>
                    <MaterialCommunityIcons
                        color={(lightTheme ? lightThemeStyle.chevron.color : styles.chevron.color)}
                        name={"chevron-up"}
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
        width: '100%',
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 20,
        paddingBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: colors.light,
    },
    caption: {
        color: colors.lighter,
        alignItems: "center",
    },
    username: {
        fontWeight: "400",
        color: colors.white,
        fontSize: 24,
        lineHeight: 24,
        marginBottom: 7,
    },
    chevron: {
        color: colors.white
    },
});

const lightThemeStyle = StyleSheet.create({
    caption: {
        color: colors.white,
    },
    username: {
        color: colors.white,
    },
    chevron: {
        color: colors.white,
    },
});

export default UserDisplay;
