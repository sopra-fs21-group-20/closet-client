import React, {useRef, useState} from "react";
import {View, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions} from "react-native";
import {Image} from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import UserDisplay from "./UserDisplay";
import FeedActions from "./FeedActions";
import {Svg, Path} from 'react-native-svg';

const DOUBLE_PRESS_DELAY = 300;

function Card({
                  post_id,
                  username,
                  profileImage,
                  caption,
                  likes,
                  hasBeenLiked,
                  comments,
                  images,
                  onPress,
                  index,
                  onCommentClick
              }) {
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
        if (!hasBeenLiked) setIsLiked(true);
    }

    //ToDo defaultSource of images
    return (
        <View style={[styles.card, (index % 2 === 0 ? null : lightTheme.card)]}>
            <ScrollView horizontal pagingEnabled style={styles.imageScrollView}>
                <TouchableWithoutFeedback onPress={handleImagePress}>
                    <View style={styles.imageScrollViewContainer}>
                        {images.map((image, index) => (
                            <Image
                                style={[styles.image, {
                                    height: Dimensions.get("window").width - 20,
                                    width: Dimensions.get("window").width - 20,
                                }]}
                                preview={{uri: image.thumbnailUrl}}
                                uri={image.url}
                                key={index}
                            />
                        ))}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <View style={styles.detailsContainer}>
                <View style={{ width: 50, height: 50, right: 0, top: -50, position: "absolute" }}>
                    <Svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M50 50V0C50 27.6142 27.6142 50 0 50H50Z" fill="#292929"/>
                    </Svg>
                </View>
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
                             lightTheme={false/*index % 2 !== 0*/}
                             onCommentClick={onCommentClick}
                             post_id={post_id}
                             captionIsEmpty={caption === ""}
                             caption_attrs={{username, caption, profileImage}}
                />
            </View>
            {/*<View style={[styles.afterCard, (index % 2 === 0 ? null : lightTheme.afterCard)]}/>*/}
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
        backgroundColor: "transparent",
        zIndex: 25,
    },
    card: {
        borderRadius: 50,
        backgroundColor: colors.dark,
        marginTop: 20,
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
        shadowColor: colors.black,
        shadowOffset: {
            height: 5,
            width: 5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        //elevation: 10, //ToDo clashes with zIndex
        overflow: "hidden",
        borderRadius: 50,
        borderBottomLeftRadius: 0,
        zIndex: 2,
    },
    imageScrollViewContainer: {
        flexDirection: "row",
    },
    detailsContainer: {
        padding: 20,
        paddingTop: 30,
        flexDirection: "column",
        marginTop: -50,
        backgroundColor: colors.dark,
        borderRadius: 50,
        borderTopRightRadius: 0,
        zIndex: 10,
    },
    image: {
        borderRadius: 50,
        borderBottomLeftRadius: 0,
        tintColor: colors.medium,
    },
});


const lightTheme = StyleSheet.create({
    afterCard: {
        backgroundColor: colors.dark
    },
    card: {
        backgroundColor: colors.dark,
    },
});

export default Card;
