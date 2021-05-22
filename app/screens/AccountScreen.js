import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,
    ScrollView,
    Button,
    RefreshControl,
    TouchableWithoutFeedback
} from "react-native";

import colors from "../config/colors";
import Screen from "../components/Screen";
import Gallery from "../components/profile/Gallery";
import ProfileDetails from "../components/profile/ProfileDetails";
import useApi from "../hooks/useApi";
import feed from "../api/feed";
import users from "../api/users";
import profile from "../api/profile";
import Text from "../components/Text";
import Card from "../components/Card";
import ActivityIndicator from "../components/ActivityIndicator";
import Ionicons from "react-native-vector-icons/Ionicons";

function AccountScreen({navigation}) {
    const getFeedApi = useApi(profile.getPosts);

    useEffect(() => {
        getFeedApi.request();
    }, []);

    const onRefresh = () => {
        getFeedApi.request();
    };

    const [pictures, setPictures] = useState(pictures);
    return (
        <>
            <ActivityIndicator visible={getFeedApi.loading}/>
            <Screen style={styles.screen}>
                {(getFeedApi.error) && (
                    <ScrollView contentContainerStyle={styles.errorView} refreshControl={
                        <RefreshControl
                            refreshing={getFeedApi.loading}
                            onRefresh={onRefresh}
                        />
                    }>
                        <View style={styles.errorViewInner}>
                            <Text
                                style={styles.errorText}>There was an error while loading the posts.</Text>
                            <Button title="Retry" onPress={getFeedApi.request}/>
                        </View>
                    </ScrollView>
                )}
                {getFeedApi.data.userPosts && (
                    <ScrollView style={styles.screenInner} refreshControl={
                        <RefreshControl
                            refreshing={getFeedApi.loading}
                            onRefresh={onRefresh}
                        />
                    } contentContainerStyle={styles.flatList}>
                        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                            <Ionicons name="ellipsis-horizontal" size={24} color="white"
                                      style={{position: 'absolute', padding: 20, right: 10, zIndex: 1}}/>
                        </TouchableWithoutFeedback>
                        <ProfileDetails userDetails={getFeedApi.data.user}
                                        postsAmount={getFeedApi.data.userPosts.length}/>
                        {getFeedApi.data.userPosts && getFeedApi.data.userPosts.length === 0 ?
                            <View style={{alignItems: 'center'}}>
                                <Text style={{color: colors.white}}>You have not yet posted any posts.</Text>
                            </View>: null}
                        <Gallery data={getFeedApi.data.userPosts}/>
                    </ScrollView>
                )}
            </Screen>
        </>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 0,
        paddingTop: 0,
        backgroundColor: colors.darker,
    },
    screenInner: {
        flex: 1,
        borderRadius: 50,
    },
    flatList: {
        flex: 1
    },
    errorView: {
        flex: 1,
        backgroundColor: colors.darker,
        paddingTop: 20,
    },
    errorViewInner: {
        flex: 1,
        backgroundColor: colors.dark,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        borderTopLeftRadius: 50,
        shadowColor: colors.black,
        shadowOffset: {
            height: -5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    errorText: {
        color: colors.white,
        marginBottom: 20,
    }
});

export default AccountScreen;
