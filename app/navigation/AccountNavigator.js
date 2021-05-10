import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import useAuth from "../auth/useAuth";
import {Platform, StyleSheet} from "react-native";
import colors from "../config/colors";

const Stack = createStackNavigator();

const AccountNavigator = () => {
    const {user, logOut} = useAuth();
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: [styles.headerStyle],
            headerTitle: user.sub ? user.sub : "Account",
            headerTitleStyle: styles.headerTitle,
        }}>
            <Stack.Screen name="Account" component={AccountScreen} options={{
                headerRight: () => (
                    <MaterialCommunityIcons name="logout" style={styles.headerRight} onPress={() => {
                        logOut();
                    }}/>
                )
            }}/>
            <Stack.Screen name="Messages" component={MessagesScreen}/>
        </Stack.Navigator>
    )
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
    headerRight: {
        color: colors.white,
        fontSize: 30,
        paddingHorizontal: 15
    }
});

export default AccountNavigator;
