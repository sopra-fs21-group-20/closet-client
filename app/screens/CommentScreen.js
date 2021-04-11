import React, {useEffect, useState} from "react";
import {FlatList, KeyboardAvoidingView, Platform, StyleSheet, View} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/feed";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import Comment from "../components/Comment";
import UserDisplay from "../components/UserDisplay";
import NewComment from "../components/NewComment";

function CommentScreen({route, navigation}) {
    const {post_id, captionAttrs, lightThemeEnabled} = route.params;

    /*const getFeedApi = useApi(feedApi.getFeed);

    //default is start=0, end=19 (20 comments)

    useEffect(() => {
      feedApi.request();
    }, []);*/

    const getCommentsApi = {
        loading: false,
        error: null,
        data: [
            {
                id: 1,
                creationDate: "2021-04-11 15:01:00",
                userId: 1,
                username: "model69",
                comment: "Wow!",
                profileImage: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
            },
            {
                id: 2,
                creationDate: "2021-04-10 12:01:00",
                userId: 2,
                username: "user1234",
                comment: "Amazing!",
                profileImage: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
            },
            {
                id: 3,
                creationDate: "2021-04-10 10:01:00",
                userId: 2,
                username: "ArosaLover123",
                comment: "This is a very very very long comment that will not overflow but still takes a lot of space.",
                profileImage: "https://favorite-styles.de/wp-content/uploads/2020/10/blog-post-outfit-2020-10-16-3-735x1102.png",
            },
        ]
    };

    return (
        <>
            <ActivityIndicator visible={getCommentsApi.loading}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            >
                <Screen style={styles.screen}>
                    {getCommentsApi.error && (
                        <>
                            <AppText>Couldn't retrieve the comments.</AppText>
                            <Button title="Retry" onPress={getCommentsApi.request}/>
                        </>
                    )}
                    <View style={[styles.commentCard, (lightThemeEnabled ? lightTheme.commentCard : null)]}>
                        <UserDisplay
                            username={captionAttrs.username}
                            profileImage={captionAttrs.profileImage}
                            caption={captionAttrs.caption}
                            expandable={true}
                            lightTheme={lightThemeEnabled}
                        />
                        <FlatList
                            style={[styles.commentList, (lightThemeEnabled ? lightTheme.commentList : null)]}
                            data={getCommentsApi.data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item, index}) => {
                                return (<Comment
                                    user_id={item.userId}
                                    username={item.username}
                                    comment={item.comment}
                                    profileImage={item.profileImage}
                                    creationDate={item.creationDate}
                                    index={index}
                                    lightThemeEnabled={lightThemeEnabled}
                                />);
                            }}
                        />
                        <NewComment
                            lightThemeEnabled={lightThemeEnabled}
                        />
                    </View>
                </Screen>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen: {
        padding: 0,
        paddingTop: 0,
        backgroundColor: colors.primary,
    },
    commentCard: {
        flex: 1,
        borderRadius: 0,
        borderTopLeftRadius: 50,
        backgroundColor: colors.dark,
        marginTop: 20,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: {
            height: -5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    commentList: {
        borderTopColor: colors.white,
        borderTopWidth: 1,
    },
});

const lightTheme = StyleSheet.create({
    commentCard: {
        backgroundColor: colors.white,
    },
    commentList: {
        borderTopColor: colors.dark,
    },
});

export default CommentScreen;
