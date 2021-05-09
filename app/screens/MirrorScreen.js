import React, {useCallback, useEffect, useState} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Canvas from "../components/Mirror/Canvas";
import CanvasItems from "../components/Mirror/CanvasItems";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import outfitApi from "../api/outfitApi";

export default function MirrorScreen() {

    /*const getOutfitApi = useApi(outfitApi.getOutfit)

    useEffect(() => {
        getOutfitApi.request();
    }, []);*/


    const outfits = [
        {
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
        },
        {
            "id": 4,
            "name": "My 2nd outfit",
            "userId": "1",
            "outfitItems": [
                {
                    "id": 1,
                    "name": 'Dsquared Shirt',
                    "price": 349.0,
                    "attributes": {
                        "color": "black",
                        "pattern": "white"
                    },
                    "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
                },
                {
                    "id": 2,
                    "name": 'Diesel Jeans Jacket',
                    "price": 349.0,
                    "attributes": {
                        "color": "dark blue",
                    },
                    "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
                },
                null,
                {
                    "id": 3,
                    "name": "Jack & Jones' Pants",
                    "price": 349.0,
                    "attributes": {
                        "color": "light blue",
                        "pattern": "slim fit"
                    },
                    "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
                },
                null,
                null,
                {
                    "id": 4,
                    "name": 'Polo Shoes',
                    "price": 349.0,
                    "attributes": {
                        "color": "black",
                        "pattern": "gloss"
                    },
                    "signedUrl": 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
                },
                null,
                null
            ],
            "collectionIds": [
                2
            ]
        },
        /*[
            {
                id: 1,
                name: 'Dsquared Shirt',
                attributes: ['expensive ', 'oversize fit'],
                uri: 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
            },
            {
                id: 2,
                name: 'Diesel Jeans Jacket',
                attributes: ['retro'],
                uri: 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
            },
            null,
            {
                id: 3,
                name: "Jack & Jones' Pants",
                attributes: ['slim fit'],
                uri: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
            },
            null,
            null,
            {
                id: 4,
                name: 'Polo Shoes',
                attributes: ['comfortable'],
                uri: 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
            },
            null,
            null
        ],
        [
            {
                id: 1,
                name: 'Dsquared Shirt 2',
                attributes: ['expensive ', 'oversize fit'],
                uri: 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
            },
            null,
            null,
            {
                id: 3,
                name: "Jack & Jones' Pants 2",
                attributes: ['slim fit'],
                uri: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
            },
            null,
            null,
            {
                id: 4,
                name: 'Polo Shoes 2',
                attributes: ['comfortable'],
                uri: 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
            },
            null,
            null
        ]*/
    ]

    /*const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
    }, []);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }*/

    const scrollX = React.useRef(new Animated.Value(0)).current

    return (
        <ScrollView style={styles.container}>
            <Animated.FlatList
                horizontal={true}
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false})}
                keyExtractor={(item) => item.id.toString()}
                /*data={getOutfitApi.data}*/
                data={outfits}
                pagingEnabled={true}
                renderItem={({item}) => {
                    return <View>
                        <Canvas outfit={item.outfitItems} key={`canvas-${item.id}`}/>
                        <CanvasItems outfitID={item.id} outfit={item} key={`canvasItem-${item.id}`}/>
                    </View>
                }}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    canvasContainer: {
        backgroundColor: colors.dark,
        height: '100%',
        width: '100%',
    },
    itemsContainer: {
        marginTop: -60,
        bottom: 0,
        width: '100%',
        backgroundColor: colors.lighter,
        borderRadius: 50,
        padding: 25,
    }
});
