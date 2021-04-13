import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import OutfitButton from "./OutfitButton";
import MirrorScreen from "../screens/MirrorScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'cameraNavigator') {
            return false;
        }

        return true;
    };
    return (<Tab.Navigator initialRouteName={"Feed"}>
        <Tab.Screen
            name="Feed"
            component={FeedNavigator}
            options={({route}) => ({
                tabBarVisible: getTabBarVisibility(route),
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons
                        name="home"
                        color={color}
                        size={size}/>
                ),

            })}
        />
        <Tab.Screen
            name="Outfit"
            component={MirrorScreen}
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
                        size={size}
                    />
                ),
            })}
        />
        <Tab.Screen
            name="Account"
            component={AccountNavigator}
            options={{
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="account" color={color} size={size}/>
                ),
            }}
        />
    </Tab.Navigator>);
};

export default AppNavigator;
