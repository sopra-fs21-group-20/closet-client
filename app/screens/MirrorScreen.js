import React, {useCallback, useEffect, useState} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Canvas from "../components/Mirror/Canvas";
import CanvasItems from "../components/Mirror/CanvasItems";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import outfitApi from "../api/outfitApi";

export default function MirrorScreen({navigation, menuOpen}) {

    /*const getOutfitApi = useApi(outfitApi.getOutfit)

    useEffect(() => {
        getOutfitApi.request();
    }, []);*/


    const outfits = [
        {
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
                    name: 'Shirt',
                    brand: 'Dsquared',
                    price: 349.0,
                    attributes: {
                        color: 'black',
                        pattern: 'white'
                    },
                    signedUrl: 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
                },
                {
                    id: 9,
                    name: 'Jeans Jacket',
                    brand: 'Diesel',
                    price: 349.0,
                    attributes: {
                        color: 'dark blue',
                    },
                    signedUrl: 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
                },
                {
                    id: 6,
                    name: 'Pants',
                    brand: 'Jack & Jones',
                    price: 349.0,
                    attributes: {
                        color: 'light blue',
                        pattern: 'slim fit'
                    },
                    signedUrl: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
                },
                {
                    id: 8,
                    name: 'Shoes',
                    brand: 'Polo',
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
        },
        {
            id: 4,
            name: 'My 2nd outfit',
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
                    name: 'Shirt',
                    brand: 'Dsquared',
                    price: 349.0,
                    attributes: {
                        color: 'black',
                        pattern: 'white'
                    },
                    signedUrl: 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
                },
                {
                    id: 9,
                    name: 'Jeans Jacket',
                    brand: 'Diesel',
                    price: 349.0,
                    attributes: {
                        color: 'dark blue',
                    },
                    signedUrl: 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
                },
                {
                    id: 6,
                    name: 'Pants',
                    brand: 'Jack & Jones',
                    price: 349.0,
                    attributes: {
                        color: 'light blue',
                        pattern: 'slim fit'
                    },
                    signedUrl: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
                },
                {
                    id: 8,
                    name: 'Shoes',
                    brand: 'Polo',
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
        },
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
        <ScrollView style={[styles.container, {marginTop: menuOpen ? 110 : 0}]}>
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
                        <Canvas outfit={item.outfitItems} positions={item.itemPositions} key={`canvas-${item.id}`}/>
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
