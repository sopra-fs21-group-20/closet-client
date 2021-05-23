import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useAuth from "../auth/useAuth";
import {Platform, StyleSheet} from "react-native";
import colors from "../config/colors";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from "@react-navigation/native";
import {DrawerContainer} from "../components/DrawerContainer";
import Ionicons from "react-native-vector-icons/Ionicons";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import PostDetailScreen from "../screens/PostDetailScreen";

const Stack = createStackNavigator();

const AccountPostNavigator = () => {
    const {user, logOut} = useAuth();
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{
                headerShown: true,
                headerBackTitle: null,
                headerTitle: null
            }}/>
        </Stack.Navigator>
    )
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
    headerRight: {
        color: colors.white,
        fontSize: 30,
        paddingHorizontal: 15
    }
});

export default AccountPostNavigator;
