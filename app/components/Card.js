import React, {useRef, useState} from "react";
import {View, StyleSheet, TouchableWithoutFeedback, ScrollView, Dimensions, TouchableOpacity} from "react-native";
import {Image} from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";
import UserDisplay from "./UserDisplay";
import FeedActions from "./FeedActions";
import {Svg, Path} from 'react-native-svg';
import Image2 from "./Image";

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
                  onCommentClick,
                  handleModal
              }) {

    const scrollableImages = useRef();

    const [isLiked, setIsLiked] = useState(false);

    const handleImagePress = (e) => {
        handleModal()
        /*const now = new Date().getTime();
        if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
            delete this.lastImagePress;
            handleImageDoublePress(e);
        } else {
            this.lastImagePress = now;
        }*/
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
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.white,
                                height: 30,
                                position: 'absolute',
                                zIndex: 2,
                                borderTopLeftRadius: 20,
                                borderBottomRightRadius: 5,
                                opacity: 0.8,
                                justifyContent: 'center',
                                paddingLeft: 10,
                                paddingRight: 15,
                            }}>
                            <Text>{username}</Text>
                        </TouchableOpacity>
                        {images.map((image, index) => (
                            <Image2
                                style={[styles.image, {
                                    height: Dimensions.get("window").width,
                                    width: Dimensions.get("window").width,
                                }]}
                                source={{uri:image.url}}
                                key={index}
                                resizeMode={"cover"}
                            />
                        ))}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
            <View style={styles.detailsContainer}>

                {/*<View style={{width: 50, height: 50, right: -30, top: -20, position: "absolute"}}>
                    <Svg width="20" height="20" viewBox="0 0 50 50" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M50 50V0C50 27.6142 27.6142 50 0 50H50Z"
                              fill="#292929"/>
                    </Svg>
                </View>*/}
                <FeedActions likes={likes}
                             comments={comments}
                             hasBeenLiked={hasBeenLiked}
                             isLiked={isLiked}
                             setIsLiked={setIsLiked}
                             lightTheme={false/*index % 2 !== 0*/}
                             onCommentClick={onCommentClick}
                             post_id={post_id}
                             captionIsEmpty={caption === ""}
                             caption_attrs={{username, caption, profileImage}}
                />
                {caption ? <View><Text style={{color: colors.white}}>{caption}</Text></View> : null}

                {/*<UserDisplay
                    username={username}
                    profileImage={profileImage}
                    caption={caption}
                    lightTheme={index % 2 !== 0}
                    onCommentClick={onCommentClick}
                    post_id={post_id}
                    caption_attrs={{username, caption, profileImage}}
                    expandable={false}
                />*/}
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
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20,
        paddingBottom: 0,
    },
    imageScrollView: {
        //elevation: 10, //ToDo clashes with zIndex
        overflow: "hidden",
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        zIndex: 2,
    },
    imageScrollViewContainer: {
        flexDirection: "row",
    },
    detailsContainer: {
        width: '100%',
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingVertical: 10,
        marginTop: -0,
        backgroundColor: colors.dark,
        borderRadius: 20,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        zIndex: 2,
    },
    image: {
        borderRadius: 20,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: colors.medium,
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
