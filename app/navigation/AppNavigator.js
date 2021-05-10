import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import OutfitButton from "./OutfitButton";
import MirrorScreen from "../screens/MirrorScreen";
import {StyleSheet} from "react-native";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ClosetScreen from "../screens/ClosetScreen";
import OutfitNavigator from "./OutfitNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
        return routeName !== 'cameraNavigator';
    };
    return (<Tab.Navigator initialRouteName={"Feed"} tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        tabBarIcon: {
            size: 32
        }
    }}>
        <Tab.Screen
            name="Feed"
            component={FeedNavigator}
            options={({route}) => ({
                tabBarVisible: getTabBarVisibility(route),
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons
                        name="home"
                        color={color}
                        style={styles.icon}
                        size={32}/>
                ),

            })}
        />
        <Tab.Screen
            name="Outfit"
            component={OutfitNavigator}
            options={({navigation}) => ({
                tabBarButton: () => (
                    <OutfitButton
                        onPress={() => navigation.navigate('Outfit')}
                    />
                ),
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons
                        name="plus-circle"
                        color={color}
                        style={styles.icon}
                        size={32}
                    />
                ),
            })}
        />
        <Tab.Screen
            name="Account"
            component={AccountNavigator}
            options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons
                        name="account"
                        color={color}
                        style={styles.icon}
                        size={32}/>
                ),
            }}
        />
    </Tab.Navigator>);
};

const styles = StyleSheet.create({
    icon: {
        top: 5,
    }
});

export default AppNavigator;
