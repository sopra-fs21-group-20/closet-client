import React, {useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Canvas from "../components/Mirror/Canvas";
import CanvasItems from "../components/Mirror/CanvasItems";
import colors from "../config/colors";

export default function MirrorScreen() {

    return (
        <Screen style={styles.container}>
            <Canvas/>
            <CanvasItems/>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
});
