import React, {useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Canvas from "../components/Mirror/Canvas";
import CanvasItems from "../components/Mirror/CanvasItems";
import colors from "../config/colors";

export default function MirrorScreen() {

    return (
        <ScrollView style={styles.container}>
            <Canvas/>
            <CanvasItems/>
            {/*<View style ={styles.itemsContainer}>
                <Text>CanvasItems</Text>
            </View>*/}
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
