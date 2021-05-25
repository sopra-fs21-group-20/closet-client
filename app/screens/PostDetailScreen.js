import React, {forwardRef, useEffect, useRef, useState} from "react";
import {FlatList, Image, RefreshControl, ScrollView, StyleSheet, View} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useApi from "../hooks/useApi";
import feed from "../api/feed";
import Text from "../components/Text";
import Modal from "react-native-modal";
import OutfitItem from "../components/OutfitItem";
import Canvas from "../components/Mirror/Canvas";
import CanvasItems from "../components/Mirror/CanvasItems";
import {useRoute} from "@react-navigation/native";

function PostDetailScreen({navigation, route}) {

    const {cardData} = route.params;

    console.log(cardData);

    const [showModal, setShowModal] = useState(false);

    const handleModal = (outfit) => {
        setShowModal(!showModal);
    }

    const navigateToComments = (post_id, captionAttrs, lightThemeEnabled) => {
        navigation.push(routes.COMMENTS, {post_id, captionAttrs, lightThemeEnabled});
    };

    return (
        <>
            <Screen style={styles.screen}>
                {!cardData && (
                    <View style={styles.errorView}>
                        <View style={styles.errorViewInner}>
                            <Text style={styles.errorText}>There was an error while loading the post.</Text>
                        </View>
                    </View>
                )}
                {cardData && (
                    <Card
                        post_id={cardData.id}
                        username={cardData.username}
                        profileImage={cardData.profileImage}
                        caption={cardData.caption}
                        hasBeenLiked={cardData.hasLiked}
                        hasBeenDisliked={cardData.hasDisliked}
                        likes={cardData.numberOfLikes}
                        dislikes={cardData.numberOfDislikes}
                        comments={cardData.numberOfComments}
                        images={cardData.images}
                        index={0}
                        onCommentClick={navigateToComments}
                        handleModal={handleModal}
                        viewableCards={[cardData.id]}
                        outfit={cardData.outfit}
                        isInjected={true}
                    />
                )}
            </Screen>
            <Modal propagateSwipe
                   style={{margin: 0}}
                   isVisible={showModal}
                   onBackdropPress={() => setShowModal(false)}
                   onSwipeComplete={() => setShowModal(false)}
                   swipeDirection={"down"}
            >
                {
                    cardData?.outfit ?
                        <Canvas outfit={cardData?.outfit.outfitItems} positions={cardData?.outfit.itemPositions}
                                modal={true}/> :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 100,
                            backgroundColor: colors.white
                        }}><Text>No Outfit connected</Text></View>
                }
            </Modal>
        </>

    );
}

const styles = StyleSheet.create({
    screen: {
        paddingHorizontal: 0,
        paddingTop: 0,
        backgroundColor: colors.darker,
    },
    errorView: {
        flex: 1,
    },
    errorViewInner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        shadowColor: colors.black,
        shadowOffset: {
            height: -5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    errorText: {
        color: colors.white,
        marginBottom: 20,
    }
});

export default PostDetailScreen;
