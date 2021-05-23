import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";

const Stack = createStackNavigator();

const AccountFeedNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="AccountScreen"
            component={AccountScreen}
        />
    </Stack.Navigator>
);

export default AccountFeedNavigator;
