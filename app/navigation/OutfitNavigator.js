import React, {useRef, useState} from "react";
import {Alert, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import routes from "../navigation/routes";

import FeedScreen from "../screens/FeedScreen";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CommentScreen from "../screens/CommentScreen";
import CameraNavigator from "./CameraNavigator";
import ClosetScreen from "../screens/ClosetScreen";
import MirrorScreen from "../screens/MirrorScreen";
import OutfitDropdown from "./OutfitDropdown";
import Text from "../components/Text";
import { useHeaderHeight } from '@react-navigation/stack';

const Stack = createStackNavigator();

const OutfitNavigator = ({navigation}) => {
    //const headerHeight = useHeaderHeight();

    return (<>
        <Stack.Navigator mode="modal" screenOptions={{
            headerStyle: [styles.headerStyle],
            headerTitleStyle: styles.headerTitle,
            headerTitle: () => <OutfitDropdown/>
        }}>
            <Stack.Screen name="Closet" component={ClosetScreen} options={{}}/>
            <Stack.Screen name="Mirror" component={MirrorScreen} options={{}}/>
        </Stack.Navigator>
        <SafeAreaView style={[styles.dropdown, {top: 40/*headerHeight*/}]}>
            <Text>Test</Text>
        </SafeAreaView>
    </>)
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.primary,
        shadowColor: 'transparent'
    },
    headerTitle: {
        color: colors.white,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontSize: 28,
        fontWeight: "400"
    },
    headerLeft: {
        color: colors.white,
        fontSize: 30,
        paddingHorizontal: 15
    },
    dropdown: {
        position: "absolute",
        backgroundColor: colors.primary
    }
});


export default OutfitNavigator;