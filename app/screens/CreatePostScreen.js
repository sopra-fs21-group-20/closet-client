import React, {useContext, useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {NavigationActions, StackActions} from "react-navigation";
import * as Yup from "yup";

import {
    Form,
    FormField,
    FormPicker as Picker,
    SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import PostImagePicker from "../components/forms/PostImagePicker";
import {MaterialIcons} from "@expo/vector-icons";
import feed from "../api/feed";
import AuthContext from "../auth/context";
import FeedContext from "../navigation/FeedContext";
import {useNavigation} from "@react-navigation/native";

const validationSchema = Yup.object().shape({
    caption: Yup.string().label("Caption"),
    images: Yup.array().min(1, "Please select at least one image."),
});

function CreatePostScreen({navigation, route}) {
    const location = useLocation();
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const {user} = useContext(AuthContext);
    const {base64} = route.params;
    //const {navigation} = useContext(FeedContext);

    const handleSubmit = async (listing, {resetForm}) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await feed.addFeedItem(
            {...listing, location, base64}, user,
            (progress) => setProgress(progress)
        );

        if (!result.ok) {
            setUploadVisible(false);
            const testLog = result;
            testLog.config.data = "";
            return alert("Could not save the post");
        }

        resetForm();
        navigation.popToTop();
    };

    return (
        <Screen style={styles.container}>
            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />
            <View style={styles.topButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="black" style={styles.backButton}/>
                </TouchableOpacity>
            </View>
            <Form
                initialValues={{
                    caption: "",
                    images: [],
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <PostImagePicker name="images" picture={route.params.picture}/>
                <FormField
                    maxLength={255}
                    multiline
                    name="caption"
                    numberOfLines={3}
                    placeholder="Caption"
                />
                <SubmitButton title="Post"/>
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    topButtonContainer: {
        paddingBottom: 30,
        paddingLeft: 10
    },
});
export default CreatePostScreen;
