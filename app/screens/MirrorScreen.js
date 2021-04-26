import React, {useCallback, useState} from "react";
import {Animated, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Canvas from "../components/Mirror/Canvas";
import CanvasItems from "../components/Mirror/CanvasItems";
import colors from "../config/colors";

export default function MirrorScreen() {

    const outfit = [
        [
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
        ]
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
                /*viewabilityConfig={viewabilityConfig}
                onViewableItemsChanged={onViewableItemsChanged}*/
                horizontal={true}
                scrollEventThrottle={32}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false})}
                data={outfit}
                keyExtractor={item => item.id}
                pagingEnabled={true}
                renderItem={({item}) => {
                    return <View>
                        <Canvas outfit={item} key={`canvas-${item.id}`}/>
                        <CanvasItems outfit={item} key={`canvasItem-${item.id}`}/>
                    </View>
                }}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    canvasContainer:{
        backgroundColor: colors.dark,
        height: '100%',
        width: '100%',
    },
    itemsContainer:{
        marginTop: -60,
        bottom: 0,
        width: '100%',
        backgroundColor: colors.lighter,
        borderRadius: 50,
        padding: 25,
    }
});
