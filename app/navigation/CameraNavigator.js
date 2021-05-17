import React, {useRef, useState} from "react";
import {StyleSheet, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import PictureTakenScreen from "../screens/PictureTakenScreen";
import TakePictureScreen from "../screens/TakePictureScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import AuthContext from "../auth/context";
import FeedContext from "./FeedContext";
import MirrorScreen from "../screens/MirrorScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../config/colors";
import CreateOutfitScreen from "../screens/CreateOutfitScreen";

const Stack = createStackNavigator();

const newItem = ({current, next, layouts}) => ({
    cardStyle: {
        transform: [
            {
                translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                }),
            },
            {
                rotate: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                }),
            },
            {
                scale: next
                    ? next.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.9],
                    })
                    : 1,
            },
        ],
        opacity: current.progress,
    },
    overlayStyle: {
        opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
        }),
    }
});

const CameraNavigator = ({navigation, route}) => {
    return (

        <Stack.Navigator mode="modal" initialRouteName={"takePicture"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="takePicture" component={TakePictureScreen}/>
            <Stack.Screen name="pictureTaken" component={PictureTakenScreen}/>
            <Stack.Screen name="chooseOutfit" options={{
                headerShown: true,
                headerTitle: null,
                headerLeft: () => <MaterialCommunityIcons name="arrow-left" style={styles.headerLeft} onPress={() => {
                    navigation.goBack();
                    }}/>,
                headerRight: () => <MaterialCommunityIcons name="plus" style={styles.headerRight} onPress={() => {
                        navigation.navigate("injectedCreateOutfit")
                    }}/>,
            }} children={() => <MirrorScreen isInjected={true} />}/>
            <Stack.Screen name="injectedCreateOutfit" navigation={navigation} route={route} options={{
                headerShown: true,
                headerTitle: null,
                headerLeft: () => <MaterialCommunityIcons name="arrow-left" style={styles.headerLeft} onPress={() => {
                    navigation.goBack();
                }}/>,
                cardStyleInterpolator: newItem,
            }} children={() => <CreateOutfitScreen isInjected={true} />}/>
            <Stack.Screen name="createPost" component={CreatePostScreen} feedNavigation={navigation}/>
        </Stack.Navigator>)

};

const styles = StyleSheet.create({
    headerLeft: {
        color: colors.white,
        fontSize: 30,
        paddingHorizontal: 15
    },
    headerRight: {
        color: colors.white,
        fontSize: 30,
        paddingRight: 15,
    }
});


export default CameraNavigator;
