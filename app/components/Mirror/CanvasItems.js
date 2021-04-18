import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, ScrollView, FlatList} from "react-native";
import colors from "../../config/colors";


export default function CanvasItems() {

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

    function CanvasListItem({imgName, imgAttributes, imageUrl}) {
        return (

            <View style={styles.list}>
                <Image source={{uri: imageUrl}} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.title}>{imgName}</Text>
                    <Text style={styles.description}>{imgAttributes}</Text>
                </View>
            </View>

        )
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.specs}>
                <Text style={styles.title}>Drip Too Hard</Text>
                <Text style={styles.description}>First outfit on MyOutf.it</Text>
                <Text style={styles.description}>Worn 10 times </Text>
            </View>
            {topRow.map((item) =>
                <CanvasListItem
                    imgName={item.name}
                    imgAttributes={item.attributes}
                    imageUrl={item.uri}/>)}
            {middleRow.map((item) =>
                <CanvasListItem
                    imgName={item.name}
                    imgAttributes={item.attributes}
                    imageUrl={item.uri}/>)}
            {bottomRow.map((item) =>
                <CanvasListItem
                    imgName={item.name}
                    imgAttributes={item.attributes}
                    imageUrl={item.uri}/>)}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        paddingVertical: 15,
        backgroundColor: colors.dark,
        borderRadius: 40,
        paddingHorizontal: 10,
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.dark,
        height: 70,
        width: '100%',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    listImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    listInformation: {
        flex: 1,
        marginLeft: 20
    },
    title: {
        color: colors.white,
        fontSize: 25,
        fontWeight: '600',
        paddingBottom: 5
    },
    description: {
        color: colors.white,
        fontSize: 18
    },
    specs: {
        padding: 10,
        alignItems: 'center'
    },
});
