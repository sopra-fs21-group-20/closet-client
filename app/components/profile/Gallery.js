import React, {useEffect} from 'react';
import {View, StyleSheet, Image, ScrollView, Dimensions} from 'react-native'

import ProfilePost from "./ProfilePost";
import colors from "../../config/colors";
import useApi from "../../hooks/useApi";
import feed from "../../api/feed";
import profile from "../../api/profile";

const paddingBetweenTiles = 3;


export default function Gallery() {

    const windowWidth = Dimensions.get("window").width-(4*paddingBetweenTiles)
    const itemsOnLine = 3

    return (
        <View style={styles.container}>
            <ProfilePost paddingBetweenTiles={paddingBetweenTiles} size={windowWidth/itemsOnLine}/>
            <ProfilePost paddingBetweenTiles={paddingBetweenTiles} size={windowWidth/itemsOnLine}/>
            <ProfilePost paddingBetweenTiles={paddingBetweenTiles} size={windowWidth/itemsOnLine}/>
            <ProfilePost paddingBetweenTiles={paddingBetweenTiles} size={windowWidth/itemsOnLine}/>
            <ProfilePost paddingBetweenTiles={paddingBetweenTiles} size={windowWidth/itemsOnLine}/>
            <ProfilePost paddingBetweenTiles={paddingBetweenTiles} size={windowWidth/itemsOnLine}/>
            <ProfilePost paddingBetweenTiles={paddingBetweenTiles} size={windowWidth/itemsOnLine}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        width: '100%',
        padding: paddingBetweenTiles,
        paddingRight: 0,
        paddingBottom: 0,
    },
})