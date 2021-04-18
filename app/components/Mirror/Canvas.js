import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, FlatList} from "react-native";
import * as Yup from "yup";
import Screen from "../Screen";
import colors from "../../config/colors";
import ProfilePost from "../profile/ProfilePost";

const paddingItem = 10
const canvasMargin = 0
const canvasWidth = Dimensions.get('window').width
const canvasHeight = canvasWidth
const itemWidth = (canvasWidth - 4 * paddingItem - 2 * canvasMargin) / 3
const itemHeight = itemWidth

export default function Canvas() {

    const clothingItems = {
        items: [{url: '\'../../assets/outfit.jpg\''},
            {url: '\'../../assets/outfit.jpg\''},
            {url: '\'../../assets/outfit.jpg\''},]
    }

    const topRow = [
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
            uri: 'https://img01.ztat.net/article/spp-media-p1/007d1365eb863a0ba2dcee421a1d3de7/9fd16a1750534fb0aedf07e5317a4aa7.jpg?imwidth=762'
        },
    ]

    const middleRow = [
        {
            id: 3,
            name: "Jack & Jones' Pants",
            attributes: ['slim fit'],
            uri: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
        },
    ]

    const bottomRow = [
        {
            id: 1,
            name: 'Polo Shoes',
            attributes: ['comfortable'],
            uri: 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
        },
    ]

    function CanvasItem({imageUrl}) {
        return (

            <View style={styles.imageContainer}>
                <Image source={{uri: imageUrl}} style={styles.image}/>
            </View>

        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {topRow.map((item) => <CanvasItem imageUrl={item.uri}/>)}
            </View>
            <View style={styles.row}>
                {middleRow.map((item) => <CanvasItem imageUrl={item.uri}/>)}
            </View>
            <View style={styles.row}>
                {bottomRow.map((item) => <CanvasItem imageUrl={item.uri}/>)}
            </View>
        </View>

    )
        ;
}

const styles = StyleSheet.create({
    container: {
        width: canvasWidth,
        height: canvasHeight + 50,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
        paddingVertical: paddingItem / 2,
        backgroundColor: colors.white,
        marginBottom: -50
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imageContainer: {
        width: itemWidth,
        height: itemHeight,
        marginVertical: paddingItem / 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%'
    },
});
