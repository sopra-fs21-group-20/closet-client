import React, {useRef, useState} from "react";
import {Alert, Platform, StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import routes from "../navigation/routes";

import FeedScreen from "../screens/FeedScreen";
import colors from "../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import CommentScreen from "../screens/CommentScreen";
import CameraNavigator from "./CameraNavigator";
import FeedContext from "./FeedContext";
import { useFonts, Damion_400Regular } from '@expo-google-fonts/damion';
import ActivityIndicator from "../components/ActivityIndicator";

const Stack = createStackNavigator();

const FeedNavigator = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        Damion_400Regular,
    });

    if (!fontsLoaded) {
        return <ActivityIndicator visible={true} />;
    }
    return (

        <FeedContext.Provider value={{navigation}}>
            <Stack.Navigator mode="float" screenOptions={{
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
                <Stack.Screen name="cameraNavigator" component={CameraNavigator} options={{headerShown: false}}/>
                <Stack.Screen name="Comments" component={CommentScreen} options={{
                    headerTitle: "Comments",
                    headerBackTitle: () => {null},
                    headerBackImage: () => (
                        <MaterialCommunityIcons name="chevron-left" style={styles.headerLeft} onPress={() => {
                            Alert.alert("Not yet implemented.");
                        }}/>
                    ),
                }}/>
            </Stack.Navigator>
        </FeedContext.Provider>)
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.darker,
        shadowColor: 'transparent'
    },
    headerTitle: {
        color: colors.white,
        fontFamily: "Damion_400Regular",
        fontSize: 40,
        fontWeight: "400",
        paddingHorizontal: 10,
        lineHeight: 44,
    },
    headerLeft: {
        color: colors.white,
        fontSize: 30,
        paddingHorizontal: 15
    }
});


export default FeedNavigator;
