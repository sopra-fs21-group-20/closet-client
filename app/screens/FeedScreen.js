import React, {useEffect, useState} from "react";
import {FlatList, StyleSheet} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";

function FeedScreen({navigation}) {
    /*const getListingsApi = useApi(listingsApi.getListings);

    useEffect(() => {
      getListingsApi.request();
    }, []);*/

    const getListingsApi = {
        loading: false,
        error: null,
        data: [
            {
                id: 1,
                username: "model69",
                caption: "This is caption 1 a very very very long caption that will overflow after two lines of text.",
                likes: 249,
                comments: [{
                    comment: "Hello"
                },{
                    comment: "Hello"
                },{
                    comment: "Hello"
                }],
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
                username: "ArosaLover123",
                caption: "This is caption 2.",
                likes: 249,
                comments: [{
                    comment: "Hello"
                },{
                    comment: "Hello"
                },{
                    comment: "Hello"
                }],
                images: [{
                    url: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                    thumbnailUrl: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
                },]
            }
        ]
    };

    /*const viabilityConfig = {
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 50
    }

    const onViewableItemsChanged = ({viewableItems, changed}) => {
        const viewablePrev = viewableItems[0].key === 1 ? null : viewableItems[0].key - 1;
        const color = viewablePrev && viewablePrev%2 === 0 ? colors.white : (viewablePrev && viewablePrev%2 === 1) ? colors.dark : colors.primary;
        console.log(color);
    };*/

    return (
        <>
            <ActivityIndicator visible={getListingsApi.loading}/>
            <Screen style={styles.screen}>
                {getListingsApi.error && (
                    <>
                        <AppText>Couldn't retrieve the listings.</AppText>
                        <Button title="Retry" onPress={getListingsApi.request}/>
                    </>
                )}
                <FlatList
                    /*viewabilityConfig={viabilityConfig}
                    onViewableItemsChanged={onViewableItemsChanged}*/
                    data={getListingsApi.data}
                    keyExtractor={(listing) => listing.id.toString()}
                    renderItem={({item, index}) => {
                        return (<Card
                            title={item.title}
                            subTitle={item.price}
                            imageUrl={item.images[0].url}
                            onPress={() => { /*navigation.navigate(routes.LISTING_DETAILS, item)*/}}
                            thumbnailUrl={item.images[0].thumbnailUrl}
                            index={index}
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
