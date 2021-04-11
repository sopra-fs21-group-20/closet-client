import React, {useRef, useState} from "react";
import {StyleSheet} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import PictureTakenScreen from "../screens/PictureTakenScreen";
import TakePictureScreen from "../screens/TakePictureScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import AuthContext from "../auth/context";
import FeedContext from "./FeedContext";

const Stack = createStackNavigator();

const CameraNavigator = ({navigation}) => {
    return (

        <Stack.Navigator mode="modal" initialRouteName={"takePicture"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="takePicture" component={TakePictureScreen}/>
            <Stack.Screen name="pictureTaken" component={PictureTakenScreen}/>
            <Stack.Screen name="createPost" component={CreatePostScreen} feedNavigation={navigation}/>
        </Stack.Navigator>)

};

const styles = StyleSheet.create({});


export default CameraNavigator;
