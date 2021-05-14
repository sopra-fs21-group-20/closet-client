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
import {useRoute} from "@react-navigation/native";

function FeedScreen({navigation}) {
    //default is start=0, end=3

    const route = useRoute();

    useEffect(() => {
        route.params?.reload ? getFeedApi.request() : null;
    }, [route]);



    /*const positionData = [
        {id: 19, position: 0},
        {id: 9, position: 1},
        {id: 6, position: 3},
        {id: 8, position: 6},
    ];

    const modalData = {
        id: 3,
        name: 'My 1st outfit',
        userId: 1,
        itemPositions: [
            {id: 19, position: 0},
            {id: 9, position: 1},
            {id: 6, position: 3},
            {id: 8, position: 6},
        ],
        outfitItems: [
            {
                id: 19,
                name: 'Dsquared Shirt',
                price: 349.0,
                attributes: {
                    color: 'black',
                    pattern: 'white'
                },
                signedUrl: 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
            },
            {
                id: 9,
                name: 'Diesel Jeans Jacket',
                price: 349.0,
                attributes: {
                    color: 'dark blue',
                },
                signedUrl: 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
            },
            {
                id: 6,
                name: 'Jack & Jones Pants',
                price: 349.0,
                attributes: {
                    color: 'light blue',
                    pattern: 'slim fit'
                },
                signedUrl: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
            },
            {
                id: 8,
                name: 'Polo Shoes',
                price: 349.0,
                attributes: {
                    color: 'black',
                    pattern: 'gloss'
                },
                signedUrl: 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
            },
        ],
        collectionIds: [
            2
        ]
    };*/

    const [showModal, setShowModal] = useState(false)
    const [myOutfit, setMyOutfit] = useState(null)
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


    const handleModal = (outfit) => {
        setMyOutfit(outfit)
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
                {getFeedApi.data && getFeedApi.data.length >= 1 && (
                        <FlatList
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
                                    hasBeenDisliked={item.hasDisliked}
                                    likes={item.numberOfLikes}
                                    dislikes={item.numberOfDislikes}
                                    comments={item.numberOfComments}
                                    images={item.images}
                                    onPress={() => { /*navigation.navigate(routes.LISTING_DETAILS, item)*/
                                    }}
                                    index={index}
                                    onCommentClick={navigateToComments}
                                    handleModal={handleModal}
                                    isViewable={item.isViewable}
                                    outfit={item.outfit}
                                />);
                            }}
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
                    myOutfit ?
                        <Canvas outfit={myOutfit.outfitItems} positions={myOutfit.itemPositions}
                                modal={true}/> :
                        <View style={{alignItems: 'center', justifyContent: 'center', height: 100, backgroundColor: colors.white}}><Text>No Outfit connected</Text></View>
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
