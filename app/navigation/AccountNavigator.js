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


const Drawer = createDrawerNavigator();

const AccountNavigator = () => {
    const {user, logOut} = useAuth();
    return (
        <Drawer.Navigator
            independant={true}
            drawerContent={props => <DrawerContainer {...props}/>}
            drawerPosition={'right'}
        >
            <Drawer.Screen name="Account" component={AccountScreen}/>
            <Drawer.Screen name="UpdateProfile" component={UpdateProfileScreen}/>
        </Drawer.Navigator>
    )

    /*return (
        <Stack.Navigator screenOptions={{
            headerStyle: [styles.headerStyle],
            headerTitle: user?.sub ? user.sub : "Account",
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
    )*/
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

export default AccountNavigator;
