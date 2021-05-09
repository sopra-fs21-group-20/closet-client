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
import CreateOutfit from "../components/Mirror/CreateOutfit";
import { StackActions } from '@react-navigation/native';
import OutfitItem from "../components/OutfitItem";

const Stack = createStackNavigator();

const OutfitNavigator = ({navigation}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isOpenChanged = (isOpenTemp) => {
        setIsOpen(isOpenTemp);
        navigation.navigate('Closet',{menuOpen: isOpenTemp})
    }

    const [editMode, setEditMode] = useState(false);
    const pushAction = StackActions.push('Closet');

    return (<>
        <Stack.Navigator mode="screen" headerMode={"float"} initialRouteName={"createOutfit"} screenOptions={{
            headerStyle: [styles.headerStyle],
            headerTitleStyle: styles.headerTitle,
            headerTitle: () => <OutfitDropdown navigation={navigation} isOpenChanged={isOpenChanged}/>
        }}>
            <Stack.Screen name="Closet" options={{
                headerLeft: () => (
                    <MaterialCommunityIcons name="filter-outline" style={styles.headerLeft} onPress={() => {
                        console.log("Filter");
                    }}/>
                ),
                headerRight: () => (
                    <MaterialCommunityIcons name={editMode ? "pencil-off-outline" : "pencil-outline"} style={styles.headerRight} onPress={() => {
                        setEditMode(!editMode);
                    }}/>
                )
            }} children={() => <ClosetScreen navigation={navigation} editMode={editMode} menuOpen={isOpen} />}/>
            <Stack.Screen name="Mirror" component={MirrorScreen} options={{
                headerRight: () => (
                    <MaterialCommunityIcons name="plus" style={styles.headerRight} onPress={() => {
                        navigation.navigate('createOutfit');
                    }}/>
                )
            }}/>
            <Stack.Screen name="createOutfit" component={CreateOutfit}/>
        </Stack.Navigator>
    </>)
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: colors.darker,
        shadowColor: 'transparent'
    },
    headerTitle: {
        color: colors.white,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontSize: 28,
        fontWeight: "400"
    },
    headerLeft: {
        color: colors.darker,
        fontSize: 30,
        paddingHorizontal: 15
    },
    headerRight: {
        color: colors.white,
        fontSize: 30,
        paddingHorizontal: 15
    },
});


export default OutfitNavigator;
