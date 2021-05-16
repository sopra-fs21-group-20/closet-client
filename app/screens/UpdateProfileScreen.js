import React, {useContext, useEffect, useState} from "react";
import {
    Button,
    Keyboard,
    KeyboardAvoidingView,
    Platform, RefreshControl,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Screen from "../components/Screen";
import Text from "../components/Text";
import Entypo from "react-native-vector-icons/Entypo";
import UploadScreen from "./UploadScreen";
import {MaterialIcons} from "@expo/vector-icons";
import {Form, FormField, SubmitButton} from "../components/forms";
import PostImagePicker from "../components/forms/PostImagePicker";
import Image from "../components/Image";
import useApi from "../hooks/useApi";
import profile from "../api/profile";
import feed from "../api/feed";
import client from "../api/client";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileDetails from "../components/profile/ProfileDetails";
import Gallery from "../components/profile/Gallery";
import * as Yup from "yup";

function UpdateProfileScreen({navigation}) {

    const getFeedApi = useApi(profile.getPosts);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        getFeedApi.request();
    }, []);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(20, 'Too Long!')
            .required('Please enter your name'),
        lastName: Yup.string()
            .max(20, 'Too Long!')
            .required('Please Enter your last name'),
        email: Yup.string()
            .email('invalid email')
            .required('Required'),
        bio: Yup.string()
            .max(255, 'Too Long!')
            .required('Required'),
    });

    const handleSubmit = async ({firstName, lastName, email, bio, resetForm}) => {
        setProgress(0);
        setUploadVisible(true);
        const result = await profile.updateProfile(
            {firstName, lastName, email, bio},
            (progress) => setProgress(progress)
        );
        if (!result.ok) {
            setUploadVisible(false);
            return alert("Could not save the post");
        }

        resetForm();
    }

    return (
        <Screen style={styles.container}>
            {getFeedApi.data.user && getFeedApi.data.user.firstName && (
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss
                }} accessible={false}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "position" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 60}
                    >
                        <UploadScreen
                            onDone={() => setUploadVisible(false)}
                            progress={progress}
                            visible={uploadVisible}
                        />
                        <View style={styles.topButtonContainer}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back" size={35} color="white"/>
                            </TouchableOpacity>
                        </View>

                        {/*<View style={styles.profilePicContainer}>
                        <TouchableWithoutFeedback onPress={() => alert('change pic')}>
                            <Image
                                style={styles.profilePic}
                                source={{uri: getFeedApi.data.signedUrl}}
                            />
                        </TouchableWithoutFeedback>
                    </View>*/}

                        <Form
                            initialValues={{
                                firstName: getFeedApi.data.user.firstName,
                                lastName: getFeedApi.data.user.lastName,
                                email: getFeedApi.data.user.email,
                                bio: getFeedApi.data.user.biography,
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            <FormField
                                maxLength={20}
                                name="firstName"
                                placeholder="First Name"
                            />
                            <FormField
                                maxLength={20}
                                name="lastName"
                                placeholder="Last Name"
                            />
                            <FormField
                                maxLength={50}
                                name="email"
                                placeholder="email"
                            />
                            <FormField
                                maxLength={255}
                                multiline
                                name="bio"
                                numberOfLines={3}
                                placeholder="Biography"
                            />
                            <SubmitButton title="save changes"/>
                        </Form>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            )}
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
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    profilePicContainer: {
        alignItems: 'center',
        marginBottom: 10
    }
});
export default UpdateProfileScreen;
