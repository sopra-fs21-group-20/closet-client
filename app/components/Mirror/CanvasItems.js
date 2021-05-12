import React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import colors from "../../config/colors";
import OutfitItem from "../OutfitItem";


export default function CanvasItems({outfit}) {

    return (
        <View style={[styles.container]}>
            <View style={styles.specs}>
                <Text style={styles.title}>{outfit.name}</Text>
                <Text style={styles.description}>{'Belongs to user ' + outfit.userId}</Text>
                <Text style={styles.description}>{'Outfit Id: ' + outfit.id}</Text>
            </View>
            {outfit.outfitItems.map((item, index) =>
                <OutfitItem state={1} data={item} key={index}/>
            )}

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
