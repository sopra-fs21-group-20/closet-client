import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image} from "react-native";
import * as Yup from "yup";
import Screen from "../Screen";
import colors from "../../config/colors";

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

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.image}/>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.image}/>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.image} />
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.image}/>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.image}/>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.image}/>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.image}/>
            </View>
        </View>
)
    ;
}

const styles = StyleSheet.create({
    container: {
        width: canvasWidth,
        height: canvasHeight,
        backgroundColor: colors.light,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
        paddingVertical: paddingItem/2,
        borderRadius: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imageContainer: {
        width: itemWidth,
        height: itemHeight,
        marginVertical: paddingItem/2,
    }
});
