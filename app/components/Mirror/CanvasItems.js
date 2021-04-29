import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, ScrollView, FlatList, TouchableOpacity} from "react-native";
import colors from "../../config/colors";


export default function CanvasItems({outfit}) {

    function getAtrributes(attributes) {
        const attr = []
        for (let [key, value] of Object.entries(attributes)) {
            attr.push(value)
        }
        return attr
    }

    function CanvasAttr({attrName}) {
        return (
            <View style={{
                backgroundColor: colors.lighter,
                marginRight: 10,
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 20
            }}>
                <Text style={{color: colors.dark}}>
                    {attrName}
                </Text>
            </View>
        )
    }

    function CanvasListItem({imgName, imgAttributes, imageUrl, outfitId}) {
        return (

            <TouchableOpacity style={styles.list}>
                <Image source={{uri: imageUrl}} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.itemName}>{imgName}</Text>
                    <View style={styles.attributes}>
                        {imgAttributes.map(attr => <CanvasAttr key={(attr, index) => `canvasItems-${outfit.id + attr+ index}`} attrName={attr}/>)}
                    </View>
                </View>
            </TouchableOpacity>

        )
    }

    return (
        <View style={[styles.container]}>
            <View style={styles.specs}>
                <Text style={styles.title}>{outfit.name}</Text>
                <Text style={styles.description}>{'Belongs to user ' + outfit.userId}</Text>
                <Text style={styles.description}>{'Outfit Id: ' + outfit.id}</Text>
            </View>
            {outfit.outfitItems.filter(item => item).map((item) =>
                <CanvasListItem
                    outfitId={outfit.id}
                    key={item.id}
                    imgName={item.name}
                    imgAttributes={getAtrributes(item.attributes)}
                    imageUrl={item.signedUrl}/>)}

        </View>

    )
}

const styles = StyleSheet.create({
    attributes: {
        flexDirection: 'row'
    },
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
    itemName: {
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
