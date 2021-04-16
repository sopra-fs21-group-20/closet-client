import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import AppLoading from "expo";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
    const [user, setUser] = useState();
    const [isReady, setIsReady] = useState(false);

    const restoreUser = async () => {
        const user = await authStorage.getUser();
        if (user) setUser(user);
    };

    /*if (!isReady)
        return (
            <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)}/>
        );*/

    return (
        <AuthContext.Provider value={{user, setUser}}>
            <OfflineNotice/>
            <NavigationContainer theme={navigationTheme}>
                {user ? <AppNavigator /> : <AuthNavigator />}
                {/*<AppNavigator/>*/}
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
