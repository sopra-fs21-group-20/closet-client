import React, {useEffect} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useHeaderHeight} from '@react-navigation/stack';

import Screen from "../components/Screen";
import colors from "../config/colors";

export default function ClosetScreen({route}) {
    let menuOpen = route.params?.menuOpen;
    return (
        <Screen>
            <View style={[styles.container, {marginTop: menuOpen ? 100 : 0, }]}>
                <View style={styles.rack}>
                    <Text style={styles.text}>Closet</Text>
                </View>
                <View style={styles.rack}>
                    <Text style={styles.text}>Closet</Text>
                </View>
                <View style={styles.rack}>
                    <Text style={styles.text}>Closet</Text>
                </View>
                <View style={styles.rack}>
                    <Text style={styles.text}>Closet</Text>
                </View>
                <View style={styles.rack}>
                    <Text style={styles.text}>Closet</Text>
                </View>
                <View style={styles.rack}>
                    <Text style={styles.text}>Closet</Text>
                </View>

            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 50,
        backgroundColor: colors.medium,
    },
    rack: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: colors.light,
        paddingVertical: 25,
    },
    text: {
        color: colors.lighter,
        fontSize: 24,
        textAlign: 'center',
    },
});
