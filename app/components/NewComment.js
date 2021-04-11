import React from "react";
import {View, StyleSheet} from "react-native";
import * as Yup from "yup";

import Text from "./Text";
import colors from "../config/colors";
import {Form, FormField, SubmitButton} from "./forms";
import feed from "../api/feed";


const validationSchema = Yup.object().shape({
    comment: Yup.string().required().label("Leave a comment..."),
});

function NewComment({lightThemeEnabled}) {
    const handleSubmit = async ({comment}) => {
        //const result = await feed.likePost(post_id);
        console.log(comment);
    };

    return (
        <View style={[styles.container,(lightThemeEnabled ? styles.container : null)]}>
            <Form
                initialValues={{ comment: "" }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <FormField
                    autoCorrect={false}
                    name="comment"
                    placeholder="Leave a comment..."
                    containerStyle={[styles.comment,(lightThemeEnabled ? styles.comment : null)]}
                />
                <SubmitButton title="Send"/>
            </Form>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        flexDirection: "column",
        paddingVertical: 20,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: colors.white,
    },
    comment: {
        color: colors.white
    }
});

const lightThemeStyle = StyleSheet.create({
    container: {
        borderTopColor: colors.dark,
    },
    comment: {
        color: colors.dark
    }
});

export default NewComment;
