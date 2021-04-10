import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import colors from "../config/colors";


export default function TakePictureScreen({navigation, sendPropsToParent}) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [pictureTaken, setPictureTaken] = useState(false);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === null || hasGalleryPermission === null) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null)
            setPictureTaken(true)
            setImage(data.uri)
            navigation.push('pictureTaken', {picture: data.uri})
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setPictureTaken(true)
            navigation.push('pictureTaken', {picture: result.uri})
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" style={styles.backButton}/>
                </TouchableOpacity>
            </View>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={[styles.camera]} type={type} ratio={'1:1'}/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <MaterialCommunityIcons name="reload" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => takePicture()}>
                    <MaterialCommunityIcons name="camera-iris" size={80} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => pickImage()}>
                    <FontAwesome name="picture-o" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    buttonContainer:{
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 100,
    },
    button:{
        width: '33%',
    },
    cameraContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
    backButton:{
        position: 'absolute',
        top: -20
    },
    topButtonContainer:{
        position: 'absolute',
        top: 80,
        left: 15
    },

})