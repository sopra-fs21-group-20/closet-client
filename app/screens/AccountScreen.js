import React, {useEffect, useState} from "react";
import {StyleSheet, View, FlatList, Image, Dimensions, ScrollView, Button} from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import Gallery from "../components/profile/Gallery";
import ProfileDetails from "../components/profile/ProfileDetails";
import useApi from "../hooks/useApi";
import feed from "../api/feed";
import users from "../api/users";
import profile from "../api/profile";

function AccountScreen() {
    console.log("race12")

    const getFeedApi = useApi(profile.getPosts);

    useEffect(() => {
        getFeedApi.request();
    }, []);
    //getFeedApi.data && getFeedApi.data.length > 0 && console.log('details', getFeedApi)

    const [pictures, setPictures] = useState(pictures);
    return (
        <Screen style={styles.screen}>
            <ScrollView style={styles.screenInner}>
                <ProfileDetails/>
                <Gallery/>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: 20,
    },
    screenInner: {
        flex: 1,
        backgroundColor: colors.white,
        borderTopLeftRadius: 50,
        shadowColor: colors.black,
        shadowOffset: {
            height: -5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
});

export default AccountScreen;
