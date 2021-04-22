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

const Stack = createStackNavigator();

const OutfitNavigator = ({navigation}) => {
    const [isOpen, setIsOpen] = useState(false);

    const isOpenChanged = (isOpenTemp) => {
        setIsOpen(isOpenTemp);
        navigation.navigate('Closet',{menuOpen: isOpenTemp})
    }

    return (<>
        <Stack.Navigator mode="modal" initialRouteName={"Closet"} screenOptions={{
            headerStyle: [styles.headerStyle],
            headerTitleStyle: styles.headerTitle,
            headerTitle: () => <OutfitDropdown isOpenChanged={isOpenChanged}/>
        }}>
            <Stack.Screen name="Mirror" component={MirrorScreen} options={{}}/>
            <Stack.Screen name="Closet" component={ClosetScreen} options={{}} initialParams={{menuOpen: isOpen}}/>
        </Stack.Navigator>
    </>)
};

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
        color: colors.white,
        fontSize: 30,
        paddingHorizontal: 15
    },
});


export default OutfitNavigator;
