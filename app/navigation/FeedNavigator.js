import React, {useRef, useState} from "react";
import {Alert, Platform, StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import FeedScreen from "../screens/FeedScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import {renderToNodeStream} from "react-dom/server";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CommentScreen from "../screens/CommentScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => {
    return (<Stack.Navigator mode="float" screenOptions={{
        headerStyle: [styles.headerStyle],
        headerTitle: "myOutf.it",
        headerTitleStyle: styles.headerTitle,
    }}>
        <Stack.Screen name="Feed" component={FeedScreen} options={{
            headerLeft: () => (
                <MaterialCommunityIcons name="camera-outline" style={styles.headerLeft} onPress={() => {
                    Alert.alert("Not yet implemented.");
                }}/>
            )
        }}/>
        <Stack.Screen name="Comments" component={CommentScreen} options={{
            headerTitle: "Comments",
            headerBackImage: () => (
                <MaterialCommunityIcons name="chevron-left" style={styles.headerLeft} onPress={() => {
                    Alert.alert("Not yet implemented.");
                }}/>
            ),
        }}/>
    </Stack.Navigator>)
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
    }
});


export default FeedNavigator;
