import React from "react";
import {View, StyleSheet} from "react-native";
import * as Yup from "yup";

import Text from "./Text";
import colors from "../config/colors";
import {Form, FormField, SubmitButton} from "./forms";
import feed from "../api/feed";
import comments from "../api/comments";
import useApi from "../hooks/useApi";


const validationSchema = Yup.object().shape({
    comment: Yup.string().required().max(150).label("Leave a comment..."),
});

function NewComment({lightThemeEnabled, post_id, refresh}) {
    const handleSubmit = async (comment, {resetForm}) => {
        //const result = await feed.likePost(post_id);
        await addComment(comment.comment);
        resetForm();
    };

    const addComment = async (comment) => {
        const result = await comments.addComment(post_id, comment);
        refresh();
    }

    return (
        <Form
            initialValues={{comment: ""}}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            style
        >
            <View style={[styles.container, (lightThemeEnabled ? lightThemeStyle.container : null)]}>
                <FormField
                    autoCorrect={false}
                    name="comment"
                    placeholder="Leave a comment..."
                    containerStyle={[styles.comment, (lightThemeEnabled ? lightThemeStyle.comment : null)]}
                    textStyle={[styles.commentText, (lightThemeEnabled ? lightThemeStyle.commentText : null)]}
                    multiline={true}
                    showErrorMessage={false}
                />
                <SubmitButton title="Send" buttonStyle={styles.buttonStyle} textStyle={styles.textStyle}/>
            </View>
        </Form>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingVertical: 20,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: colors.white,
    },
    comment: {
        color: colors.white,
        flex: 1,
        marginRight: 15,
        backgroundColor: colors.darker
    },
    commentText: {
        color: colors.white
    },
    buttonStyle: {
        width: 100,
    },
    textStyle: {

    }
});

const lightThemeStyle = StyleSheet.create({
    container: {
        borderTopColor: colors.dark,
    },
    comment: {
        color: colors.dark,
        backgroundColor: colors.light,
    },
    commentText: {
        color: colors.dark
    },
    buttonStyle: {

    },
    textStyle: {

    }
});

export default NewComment;
