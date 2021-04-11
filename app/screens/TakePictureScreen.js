import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import colors from "../config/colors";

const dimensions = Dimensions.get('screen')
const cameraDimensions = 4/3

export default function TakePictureScreen({navigation}) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [pictureTaken, setPictureTaken] = useState(false);
    const [flashMode, setFlashMode] = useState('off')
    const [flashIcon, setFlashIcon] = useState('flash-off')
    const DOUBLE_PRESS_DELAY = 300;

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
            const data = await camera.takePictureAsync({base64: true, quality: 0})
            setPictureTaken(true)
            setImage(data.uri)
            navigation.push('pictureTaken', {picture: data.uri, base64: data.base64, cameraDimensions})
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setPictureTaken(true)
            navigation.push('pictureTaken', {picture: result.uri})
        }
    };

    const handleTap = (e) => {
        const now = new Date().getTime();
        if (this.lastPress && (now - this.lastPress) < DOUBLE_PRESS_DELAY) {
            delete this.lastPress;
            handleDoubleTap(e);
        } else {
            this.lastPress = now;
        }
    }

    const handleDoubleTap = (e) => {
        switchCamera();
    }

    const switchCamera = () => {
        setType(
            type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    }

    const setFlash = () => {
        flashMode === 'off' ? setFlashMode('on') : setFlashMode('off')
        flashIcon === 'flash-off' ? setFlashIcon('flash-on') : setFlashIcon('flash-off')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFlash()}>
                    <MaterialIcons name={flashIcon} size={35} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={handleTap}>
                <View style={styles.cameraContainer}>
                    <Camera
                        ref={ref => setCamera(ref)}
                        flashMode={flashMode}
                        style={styles.camera}
                        type={type}
                        ratio={'4:3'}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={switchCamera}>
                    <MaterialCommunityIcons name="reload" size={35} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => takePicture()} View style={styles.triggerButton}>
                    <View style={styles.triggerButtonChild}/>
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
        height: (dimensions.height-dimensions.width * cameraDimensions) * 0.6,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    topButtonContainer:{
        flexDirection: 'row',
        width:'100%',
        height: (dimensions.height-dimensions.width * cameraDimensions)* 0.4,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 25,
    },
    button:{
        width: '33%',
    },
    cameraContainer: {
        /*flex: 1,*/
        height: dimensions.width * cameraDimensions,
        flexDirection: 'row',
    },
    camera: {
        flex: 1,
    },
    triggerButton:{
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    triggerButtonChild:{
        borderRadius: 35,
        height: 70,
        width: 70,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
    },

})