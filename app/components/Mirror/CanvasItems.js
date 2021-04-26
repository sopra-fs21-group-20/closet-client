import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, ScrollView, FlatList} from "react-native";
import colors from "../../config/colors";


export default function CanvasItems({outfit}) {

    function CanvasListItem({imgName, imgAttributes, imageUrl}) {
        return (

            <View style={styles.list}>
                <Image source={{uri: imageUrl}} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.itemName}>{imgName}</Text>
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
            {outfit.filter( item=> item).map((item) =>
                <CanvasListItem
                    key={item.id}
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
        backgroundColor: colors.darker,
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
    itemName:{
        color: colors.white,
        fontSize: 22,
        fontWeight: '500',
        paddingBottom: 5
    },
    description: {
        color: colors.white,
        fontSize: 18,
        fontStyle: 'italic'
    },
    specs: {
        padding: 10,
        alignItems: 'center'
    },
});
