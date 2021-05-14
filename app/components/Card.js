import React, {useRef, useState} from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    SafeAreaView, Platform
} from "react-native";
import {Image} from "react-native-expo-image-cache";
import * as Progress from 'react-native-progress';

import Text from "./Text";
import colors from "../config/colors";
import UserDisplay from "./UserDisplay";
import FeedActions from "./FeedActions";
import {Svg, Path} from 'react-native-svg';
import Image2 from "./Image";
import feed from "../api/feed";

const DOUBLE_PRESS_DELAY = 300;

function Card({
                  post_id,
                  username,
                  profileImage,
                  caption,
                  likes,
                  dislikes,
                  hasBeenLiked,
                  hasBeenDisliked,
                  comments,
                  outfit,
                  images,
                  onPress,
                  index,
                  onCommentClick
              }) {

    const scrollableImages = useRef();

    //const [isLiked, setIsLiked] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState((likes + dislikes) === 0 ? 0 : likes / (dislikes + likes))
    const [isViewable, setIsViewable] = useState(isViewable)

    const getPollRate = async () => {
        const result = await feed.getPostPoll(post_id)
        const likes = parseFloat(result.data.numberOfLikes)
        const dislikes = parseFloat(result.data.numberOfDislikes)
        return likes / (likes + dislikes)
    }

    const refreshPoll = (rate) => {
        if (rate >= 0) {
            setProgress(rate)
        }
    }


    const handleImagePress = (e) => {
        setShowModal(!showModal);
        /*const now = new Date().getTime();
        if (this.lastImagePress && (now - this.lastImagePress) < DOUBLE_PRESS_DELAY) {
            delete this.lastImagePress;
            handleImageDoublePress(e);
        } else {
            this.lastImagePress = now;
        }*/
    }

    /*const handleImageDoublePress = (e) => {
        if (!hasBeenLiked) setIsLiked(true);
    }*/

    //ToDo defaultSource of images
    return (
        <>
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
                                    source={{uri: image.url}}
                                    key={index}
                                    resizeMode={"cover"}
                                />
                            ))}
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <View style={styles.detailsContainer}>
                    <Progress.Bar
                        progress={progress}
                        width={Dimensions.get("window").width - 50}
                        color={'white'}
                        style={{
                            marginBottom: 20,
                            alignSelf: 'center',
                        }}/>
                    <FeedActions likes={likes}
                                 comments={comments}
                                 hasBeenLiked={hasBeenLiked}
                                 hasBeenDisliked={hasBeenDisliked}
                                 lightTheme={false/*index % 2 !== 0*/}
                                 onCommentClick={onCommentClick}
                                 post_id={post_id}
                                 captionIsEmpty={caption === ""}
                                 caption_attrs={{username, caption, profileImage}}
                                 refreshPoll={refreshPoll}
                                 getPollRate={getPollRate}
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
            <Modal propagateSwipe
                   style={{margin: 0,}}
                   isVisible={showModal}
                   onBackdropPress={() => setShowModal(false)}
                   onSwipeComplete={() => setShowModal(false)}
                   swipeDirection={"down"}
            >
                <SafeAreaView style={{flex: 1, height: Dimensions.get("screen").height}}>
                    <TouchableOpacity onPress={() => {
                        setShowModal(false);
                    }} style={[styles.closeIconContainer, Platform.OS === "ios" ? {top: 60} : null]}>
                        <MaterialCommunityIcons
                            name="close"
                            color={colors.white}
                            style={styles.closeIcon}
                            size={20}/>
                    </TouchableOpacity>
                    {outfit.outfitItems && outfit.itemPositions && <><Canvas outfit={outfit.outfitItems} positions={outfit.itemPositions} modal={true}/>
                    <CanvasItems outfit={outfit}/></>}
                </SafeAreaView>
            </Modal>
        </>
    );
};

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
    closeIconContainer: {
        position: "absolute",
        right: 10,
        top: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
        zIndex: 10,
        backgroundColor: colors.dark,
        justifyContent: "center",
        alignItems: "center",
    },
    closeIcon: {},
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
