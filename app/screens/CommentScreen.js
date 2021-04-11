import React, {useEffect, useState} from "react";
import {FlatList, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StyleSheet, View} from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/feed";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import comments from "../api/comments";
import Comment from "../components/Comment";
import UserDisplay from "../components/UserDisplay";
import NewComment from "../components/NewComment";
import Text from "../components/Text";
import feed from "../api/feed";

function CommentScreen({route, navigation}) {
    const {post_id, captionAttrs, lightThemeEnabled} = route.params;

    const commentsApi = useApi(comments.getComments);

    //default is start=0, end=19 (20 comments)

    useEffect(() => {
        const response = commentsApi.request(post_id);

        if (commentsApi.error) console.log(commentsApi);
    }, []);

    /*const commentsApi = {
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
    };*/

    const onRefresh = () => {
        commentsApi.request(post_id);
    };

    console.log(commentsApi.data);

    return (
        <>
            <ActivityIndicator visible={commentsApi.loading}/>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
            >
                <Screen style={styles.screen}>
                    {commentsApi.error && (
                        <ScrollView contentContainerStyle={styles.errorView} refreshControl={
                            <RefreshControl
                                refreshing={commentsApi.loading}
                                onRefresh={onRefresh}
                            />
                        }>
                            <View style={styles.errorViewInner}>
                                <Text
                                    style={styles.errorText}>There was an error while loading the comments.</Text>
                                <Button title="Retry" onPress={commentsApi.request}/>
                            </View>
                        </ScrollView>
                    )}
                    {commentsApi.data && (
                        <>
                            <FlatList
                                style={[styles.commentCard, (lightThemeEnabled ? lightTheme.commentCard : null)]}
                                data={commentsApi.data}
                                onRefresh={() => onRefresh()}
                                refreshing={commentsApi.loading}
                                ListEmptyComponent={<View style={styles.errorTextContainer}><Text
                                    style={[styles.errorText, (lightThemeEnabled ? lightTheme.errorText : null)]}>Be the
                                    first to leave a comment!</Text></View>}
                                contentContainerStyle={{flex: 1}}
                                ListHeaderComponent={() => <UserDisplay
                                    username={captionAttrs.username}
                                    profileImage={captionAttrs.profileImage}
                                    caption={captionAttrs.caption}
                                    expandable={true}
                                    lightTheme={lightThemeEnabled}
                                />}
                                ListHeaderComponentStyle={[styles.commentList, (lightThemeEnabled ? lightTheme.commentList : null)]}
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
                            <View style={[styles.commentCardAfter, (lightThemeEnabled ? lightTheme.commentCardAfter : null)]} />
                            <View style={[styles.footer, (lightThemeEnabled ? lightTheme.footer : null)]}>
                                <NewComment
                                    lightThemeEnabled={lightThemeEnabled}
                                    post_id={post_id}
                                    refresh={onRefresh}
                                />
                            </View>
                        </>)}
                </Screen>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
    },
    screen: {
        padding: 0,
        paddingTop: 0,
        backgroundColor: colors.primary,
    },
    errorView: {
        flex: 1,
        backgroundColor: colors.primary,
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
    errorTextContainer: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    errorText: {
        color: colors.white,
    },
    commentCard: {
        flex: 1,
        backgroundColor: colors.dark,
        borderRadius: 0,
        borderTopLeftRadius: 50,
        marginTop: 20,
        padding: 20,
        shadowColor: colors.black,
        shadowOffset: {
            height: -5
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
        zIndex:10,
    },
    commentCardAfter: {
        position: "absolute",
        bottom: 0,
        backgroundColor: colors.dark,
        height: 300,
        width: "100%",
    },
    commentList: {
        borderBottomColor: colors.white,
        borderBottomWidth: 1,
    },
    footer: {
        backgroundColor: colors.dark,
        paddingHorizontal: 20,
        zIndex: 10,
    }
});

const lightTheme = StyleSheet.create({
    commentCard: {
        backgroundColor: colors.white,
    },
    commentCardAfter: {
        backgroundColor: colors.white,
    },
    commentList: {
        borderBottomColor: colors.dark,
    },
    footer: {
        backgroundColor: colors.white,
    },
    errorText: {
        color: colors.dark
    }
});

export default CommentScreen;
