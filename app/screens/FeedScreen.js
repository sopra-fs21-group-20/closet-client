import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/feed";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import feed from "../api/feed";

function FeedScreen({navigation}) {
    const [listings, setListings] = useState([])

    //default is start=0, end=3

    const getFeedApi = useApi(feed.getFeed());

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

    const navigateToComments = (post_id, captionAttrs, lightThemeEnabled) => {
        console.log(post_id, captionAttrs);
        navigation.push(routes.COMMENTS, {post_id, captionAttrs, lightThemeEnabled});
    };

    return (
        <>
            <ActivityIndicator visible={getFeedApi.loading}/>
            <Screen style={styles.screen}>
                {getFeedApi.error && (
                    <>
                        <AppText>Couldn't retrieve the listings.</AppText>
                        <Button title="Retry" onPress={getFeedApi.request}/>
                    </>
                )}
                <FlatList
                    /*viewabilityConfig={viabilityConfig}
                    onViewableItemsChanged={onViewableItemsChanged}*/
                    data={getFeedApi.data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item, index}) => {
                        return (<Card
                            post_id={item.id}
                            username={item.username}
                            profileImage={item.profileImage}
                            caption={item.caption}
                            likes={item.likes}
                            comments={item.comments}
                            images={item.images}
                            onPress={() => { /*navigation.navigate(routes.LISTING_DETAILS, item)*/}}
                            index={index}
                            onCommentClick={navigateToComments}
                        />);
                    }}
                />
            </Screen>
        </>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: 0,
        paddingTop: 0,
        backgroundColor: colors.primary,
    },
});

export default FeedScreen;
