import React, {useRef, useState} from "react";
import {Alert, Platform, StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import routes from "../navigation/routes";

import FeedScreen from "../screens/FeedScreen";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CommentScreen from "../screens/CommentScreen";
import CameraNavigator from "./CameraNavigator";

const Stack = createStackNavigator();

const FeedNavigator = ({navigation}) => {
    return (<Stack.Navigator mode="float" screenOptions={{
        headerStyle: [styles.headerStyle],
        headerTitle: "myOutf.it",
        headerTitleStyle: styles.headerTitle,
    }}>
        <Stack.Screen name="Feed" component={FeedScreen} options={{
            headerLeft: () => (
                <MaterialCommunityIcons name="camera-outline" style={styles.headerLeft} onPress={() => {
                    navigation.navigate('cameraNavigator');
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
