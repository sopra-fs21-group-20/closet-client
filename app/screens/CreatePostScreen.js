import React, {useContext, useState} from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
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
    const {base64, outfitId} = route.params;
    //const {navigation} = useContext(FeedContext);

    const handleSubmit = async (listing, {resetForm}) => {
        if(listing.caption !== "") {
            setProgress(0);
            setUploadVisible(true);
            const formData = {caption: listing.caption, image: base64, outfitId};
            const result = await feed.addFeedItem(
                formData, user,
                (progress) => setProgress(progress)
            );

            if (!result.ok) {
                // Deletes the base64 from the response
                const temp = result;
                delete temp.config;
                console.log(temp);
                setUploadVisible(false);
                return alert("Could not save the post");
            }

            resetForm();
            navigation.navigate('Feed', {screen: 'Feed', reload: true});

        } else {
            Alert.alert("Please enter a caption.")
        }
    };

    return (
        <Screen style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss
            }} accessible={false}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "position" : "height"}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 60}
                >
                    <UploadScreen
                        onDone={() => setUploadVisible(true)}
                        progress={progress}
                        visible={uploadVisible}
                    />
                    <View style={styles.topButtonContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={35} color="white"/>
                        </TouchableOpacity>
                    </View>
                    <Form
                        initialValues={{
                            caption: "",
                            outfit: route.params.outfitName,
                            images: [{uri:route.params.picture}],
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        <PostImagePicker name="images" editable={false} hasMultiple={false}/>
                        <FormField
                            maxLength={255}
                            multiline
                            name="outfit"
                            numberOfLines={3}
                            placeholder="Outfit"
                            editable={false}
                        />
                        <FormField
                            maxLength={255}
                            multiline
                            name="caption"
                            numberOfLines={3}
                            placeholder="Caption"
                        />
                        <SubmitButton title="Post"/>
                    </Form>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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
