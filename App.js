import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import AppLoading from "expo";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { StatusBar } from 'expo-status-bar';
import {Platform, View} from "react-native";
import Text from "./app/components/Text";

export default function App() {
    const [user, setUser] = useState();

    const restoreUser = async () => {
        const user = await authStorage.getUser();
        if (user) setUser(user);
    };

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <OfflineNotice/>
            <NavigationContainer theme={navigationTheme}>
                {user ? <AppNavigator/> : <AuthNavigator/>}
                {/*<AppNavigator/>*/}
            </NavigationContainer>
            <StatusBar style={"light"} />
        </AuthContext.Provider>
    );
}
