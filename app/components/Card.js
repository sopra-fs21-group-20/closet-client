import React, {useRef, useState} from "react";
import {View, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions} from "react-native";
import {Image} from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import UserDisplay from "./UserDisplay";
import FeedActions from "./FeedActions";

const DOUBLE_PRESS_DELAY = 300;

function Card({post_id, username, profileImage, caption, likes, hasBeenLiked, comments, images, onPress, index, onCommentClick}) {
    const scrollableImages = useRef();

    const [isLiked, setIsLiked] = useState(false);

    const handleImagePress = (e) => {
        const now = new Date().getTime();
        if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
            delete this.lastImagePress;
            handleImageDoublePress(e);
        } else {
            this.lastImagePress = now;
        }
    }

    const handleImageDoublePress = (e) => {
        if(!hasBeenLiked) setIsLiked(true);
    }
    //ToDo defaultSource of images
    return (
        <View style={[styles.card, (index % 2 === 0 ? null : lightTheme.card)]}>
            <ScrollView horizontal pagingEnabled style={styles.imageScrollView}>
                <TouchableWithoutFeedback onPress={handleImagePress}>
                    <View style={styles.imageScrollViewContainer}>
                        {images.map((image, index) => (
                            <Image
                                style={[styles.image, {height:Dimensions.get("screen").width - 40, width:Dimensions.get("screen").width - 40}]}
                                tint="light"
                                preview={{uri: image.thumbnailUrl}}
                                uri={image.url}
                                key={index}
                            />
                        ))}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <View style={styles.detailsContainer}>
                <UserDisplay
                    username={username}
                    profileImage={profileImage}
                    caption={caption}
                    lightTheme={index % 2 !== 0}
                    onCommentClick={onCommentClick}
                    post_id={post_id}
                    caption_attrs={{username, caption, profileImage}}
                    expandable={false}
                />
                <FeedActions likes={likes}
                             comments={comments}
                             hasBeenLiked={hasBeenLiked}
                             isLiked={isLiked}
                             lightTheme={index % 2 !== 0}
                             onCommentClick={onCommentClick}
                             post_id={post_id}
                             caption_attrs={{username, caption, profileImage}}
                />
            </View>
            <View style={[styles.afterCard, (index % 2 === 0 ? null : lightTheme.afterCard)]}/>
        </View>
    );
}

/*const headerHeight = ;
const tabBarHeight = useBottomTabBarHeight();*/

const styles = StyleSheet.create({
    afterCard: {
        height: 90,
        bottom: -90,
        left: 0,
        right: 0,
        position: "absolute",
        backgroundColor: colors.dark
    },
    card: {
        borderRadius: 0,
        borderTopLeftRadius: 50,
        backgroundColor: colors.dark,
        marginTop: 20,
        padding: 20,
        paddingBottom: 0,
        shadowColor: colors.black,
        shadowOffset: {
            height: -5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    imageScrollView: {
        overflow: "hidden",
        borderRadius: 15,
        borderTopLeftRadius: 35,
        borderBottomRightRadius: 35,
        shadowColor: colors.black,
        shadowOffset: {
            height: 5,
            width: 5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    imageScrollViewContainer: {
        flexDirection: "row",
    },
    detailsContainer: {
        paddingVertical: 20,
        flexDirection: "column",
    },
    image: {
        height: 400,
        width: 400,
        borderRadius: 15,
        borderTopLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
});


const lightTheme = StyleSheet.create({
    afterCard: {
        backgroundColor: colors.white
    },
    card: {
        backgroundColor: colors.white,
    },
});

export default Card;
