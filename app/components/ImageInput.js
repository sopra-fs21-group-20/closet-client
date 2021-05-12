import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    Alert, TouchableOpacity, Dimensions,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";
import {useFormikContext} from "formik";

function ImageInput({onAddImage, onRemoveImage, key = 0, name}) {
    const {values} = useFormikContext();

    const [forceUpdate, setForceUpdate] = useState(0);

    useEffect(() => {
        console.log("effect", values);
            setImageUri(values[name][key]);
            setForceUpdate(forceUpdate+1);
    }, [values[name]]);


    const [imageUri, setImageUri] = useState(values[name][key]);

    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.");
    };

    const handlePress = () => {
        /*if (!imageUri) selectImage();
        else
            Alert.alert("Delete", "Do you really want to remove?", [
                {text: "Yes", onPress: () => onRemoveImage(null)},
                {text: "No"},
            ]);*/
        selectImage();
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            });
            if (!result.cancelled) {
                onAddImage(result.uri);
            } else {
                onRemoveImage(null);
            }
        } catch (error) {
            console.log("Error reading an image", error);
        }
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.container}>
                {!imageUri && (
                    <MaterialCommunityIcons
                        color={colors.medium}
                        name="camera"
                        size={100}
                    />
                )}
                {imageUri && (
                    <View style={styles.editImage}>
                        <MaterialCommunityIcons
                            color={colors.white}
                            name="image-edit-outline"
                            size={50}
                        />
                    </View>
                )}
                {imageUri && <Image source={{uri: imageUri}} style={styles.image}/>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.light,
        borderRadius: 15,
        justifyContent: "center",
        marginVertical: 10,
        overflow: "hidden",
        position: "relative",
        width: Dimensions.get("screen").width - 80,
        height: Dimensions.get("screen").width - 80,
    },
    image: {
        height: "100%",
        width: "100%",
    },
    editImage: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.3)",
    }
});

export default ImageInput;
