import React, {useEffect, useState} from "react";
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

function FeedScreen({navigation}) {
    //default is start=0, end=3

    const modalData = {
        "id": 3,
        "name": "My 1st outfit",
        "userId": "1",
        "outfitItems": [
            {
                "id": 1,
                "name": "Mystic Sun & Moon T-Shirt",
                "price": 49.90,
                "attributes": {
                    "color": "black",
                    "size": "M"
                },
                "signedUrl": "https://img01.ztat.net/article/spp-media-p1/26e07279febb37bea3330484f52a05a3/b93b6bc6aa2347ca940607e4620d9e4e.jpg?imwidth=1800&filter=packshot"
            },
            null,
            null,
            {
                "id": 3,
                "name": "Chino-Bermuda Shorts",
                "price": 29,
                "attributes": {
                    "color": "beige",
                },
                "signedUrl": "https://img01.ztat.net/article/spp-media-p1/08cbec480caf3077954f24e83f8970aa/2dc250c943084129858923cba4bab5db.jpg?imwidth=1800&filter=packshot"
            },
            {
                "id": 2,
                "name": "Gucci Belt",
                "price": 349.0,
                "attributes": {
                    "color": "black",
                    "pattern": "matte"
                },
                "signedUrl": "https://cdn-images.farfetch-contents.com/12/14/71/16/12147116_10105896_480.jpg"
            },
            null,
            {
                "id": 4,
                "name": "The Roger",
                "price": 499,
                "attributes": {
                    "color": "beige",
                    "attr": "limited"
                },
                "signedUrl": "https://images.ctfassets.net/od02wyo8cgm5/1jVSrUcc6lGmRy9sGZQFZF/a38da5e8270e59a6f6833902c0956f07/theroger_centre_court-fw20-white_gum-m-t.png?w=150&q=80"
            },
            null,
            null
        ],
        "collectionIds": [
            2
        ]
    }

    const [showModal, setShowModal] = useState(false)
    console.log(showModal)

    const getFeedApi = useApi(feed.getFeed);

    useEffect(() => {
        getFeedApi.request();
    }, []);

    /*const getFeedApi = {
        loading: false,
        error: null,
        data: [
            {
                id: 1,
                creationDate: null,
                username: "model69",
                profileImage: "https://cdn.21buttons.com/users/ccbf5acf555b4729be948a118202b688.medium.jpg",
                caption: "This is caption 1 a very very very long caption that will overflow after two lines of text.",
                likes: 1236,
                comments: 234,
                images: [{
                    url: "https://cdn.21buttons.com/users/ccbf5acf555b4729be948a118202b688.medium.jpg",
                    thumbnailUrl: "https://cdn.21buttons.com/users/ccbf5acf555b4729be948a118202b688.medium.jpg",
                }, {
                    url: "https://i.pinimg.com/originals/30/f8/bb/30f8bb76b033662eb80f0000fdc8a434.jpg",
                    thumbnailUrl: "https://i.pinimg.com/originals/30/f8/bb/30f8bb76b033662eb80f0000fdc8a434.jpg",
                },]
            },
            {
                id: 2,
                creationDate: null,
                username: "ArosaLover123",
                profileImage: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                caption: "This is caption 2.",
                likes: 249,
                comments: 100023,
                images: [{
                    url: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                    thumbnailUrl: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                },]
            },
            {
                id: 3,
                creationDate: null,
                username: "ArosaLover123",
                profileImage: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                caption: "This is caption 2.",
                likes: 249,
                comments: 100023,
                images: [{
                    url: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                    thumbnailUrl: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                },]
            }
        ]
    };*/

    /*const viabilityConfig = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 50
    }

    const onViewableItemsChanged = ({viewableItems, changed}) => {
        const viewablePrev = viewableItems[0].key === 1 ? null : viewableItems[0].key - 1;
        const color = viewablePrev && viewablePrev%2 === 0 ? colors.white : (viewablePrev && viewablePrev%2 === 1) ? colors.dark : colors.primary;
        console.log(color);
    };*/

    const handleModal = () => {
        if (showModal === false) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }

    const navigateToComments = (post_id, captionAttrs, lightThemeEnabled) => {
        navigation.push(routes.COMMENTS, {post_id, captionAttrs, lightThemeEnabled});
    };

    const onRefresh = () => {
        getFeedApi.request();
    };

    return (
        <>
            <ActivityIndicator visible={getFeedApi.loading}/>
            <Screen style={styles.screen}>
                {(getFeedApi.error || (getFeedApi.data && getFeedApi.data.length === 0)) && (
                    <ScrollView contentContainerStyle={styles.errorView} refreshControl={
                        <RefreshControl
                            refreshing={getFeedApi.loading}
                            onRefresh={onRefresh}
                            colors={[colors.light]}
                            tintColor={colors.light}
                        />
                    }>
                        <View style={styles.errorViewInner}>
                            <Text
                                style={styles.errorText}>{getFeedApi.data && getFeedApi.data.length === 0 ? "There are no current posts in the feed." : "There was an error while loading the feed"}</Text>
                            <Button title="Retry" onPress={getFeedApi.request}/>
                        </View>
                    </ScrollView>
                )}
                {getFeedApi.data && getFeedApi.data.length >= 1 && (<FlatList
                    /*viewabilityConfig={viabilityConfig}
                    onViewableItemsChanged={onViewableItemsChanged}*/
                    contentContainerStyle={styles.flatList}
                    refreshControl={<RefreshControl
                        refreshing={getFeedApi.loading}
                        onRefresh={onRefresh}
                        colors={[colors.light]}
                        tintColor={colors.light}
                    />}
                    data={getFeedApi.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item, index}) => {
                        return (<Card
                            post_id={item.id}
                            username={item.username}
                            profileImage={item.profileImage}
                            caption={item.caption}
                            hasBeenLiked={item.hasLiked}
                            likes={item.numberOfLikes}
                            comments={item.numberOfComments}
                            images={item.images}
                            onPress={() => { /*navigation.navigate(routes.LISTING_DETAILS, item)*/
                            }}
                            index={index}
                            onCommentClick={navigateToComments}
                            handleModal={handleModal}
                        />);
                    }}
                />)}
            </Screen>
            <Modal propagateSwipe
                   style={{margin: 0}}
                   isVisible={showModal}
                   onBackdropPress={() => setShowModal(false)}
                   onSwipeComplete={() => setShowModal(false)}
                   swipeDirection={"down"}
            >

                <Canvas outfit={modalData.outfitItems} modal={true}/>
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
    flatList: {
        paddingBottom: 40,
    },
    errorView: {
        flex: 1,
        backgroundColor: colors.darker,
        paddingTop: 20,
    },
    errorViewInner: {
        flex: 1,
        backgroundColor: colors.dark,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        borderRadius: 50,
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

export default FeedScreen;
