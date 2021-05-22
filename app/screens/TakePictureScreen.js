import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback,
    Dimensions, Button,
} from 'react-native';
import {Camera} from 'expo-camera';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import colors from "../config/colors";

const dimensions = Dimensions.get('screen')
const cameraDimensions = 4 / 3
const cameraContainerHeight = dimensions.width * cameraDimensions
const topButtonContainerHeight = (dimensions.height - dimensions.width * (1 + 1 / 3)) * 0.4
const bottomButtonContainerHeight = (dimensions.height - dimensions.width * cameraDimensions) * 0.6
const compression = 0.5

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

/*    if (hasCameraPermission === null || hasGalleryPermission === null) {
        return <View/>;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }*/

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(/*{base64: true, quality: 0}*/)
            setPictureTaken(true)
            setImage(data.uri)
            const imageInfo = await FileSystem.getInfoAsync(data.uri)
            const manipulatedImg = await compress(data.uri)
            navigation.push('pictureTaken', {
                picture: manipulatedImg.uri,
                base64: manipulatedImg.base64,
                cameraDimensions
            })
        }
    }

    const pickImage = async () => {
        if (!hasGalleryPermission){
            alert('The app has no permission to use your gallery.')
            return
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: compression,
            base64: true
        });

        if (!result.cancelled) {
            let cameraDimensions = 1
            setImage(result.uri);
            setPictureTaken(true)
            const imageInfo = await FileSystem.getInfoAsync(result.uri)
            navigation.push('pictureTaken', {picture: result.uri, base64: result.base64, cameraDimensions})
        }
    };

    const compress = async (imgUri) => {
        return await ImageManipulator.manipulateAsync(
            imgUri,
            [{resize: {width: dimensions.width}}],
            {compress: compression, format: ImageManipulator.SaveFormat.JPEG, base64: true}
        );
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
                    <MaterialIcons name="arrow-back" size={35} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFlash()}>
                    <MaterialIcons name={flashIcon} size={35} color="white"/>
                </TouchableOpacity>
            </View>
            <TouchableWithoutFeedback onPress={handleTap}>
                <View style={styles.cameraContainer}>
                    {
                        hasCameraPermission ?
                            <Camera
                                ref={ref => setCamera(ref)}
                                flashMode={flashMode}
                                style={styles.camera}
                                type={type}
                                ratio={'4:3'}
                            />
                            :
                            <View style={{alignSelf: 'center'}}>
                                <Text style={styles.text}>The app has no permission to use your camera.</Text>
                                <Text style={styles.text}>Please check your settings.</Text>
                                <Button title={'go back'} onPress={()=> navigation.goBack()}/>
                            </View>
                    }
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={switchCamera}>
                    <MaterialCommunityIcons name="reload" size={35} color="white"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => takePicture()} View style={styles.triggerButton}>
                    <View style={styles.triggerButtonChild}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => pickImage()}>
                    <FontAwesome name="picture-o" size={30} color="white"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    buttonContainer: {
        width: '100%',
        height: bottomButtonContainerHeight,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    topButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        height: topButtonContainerHeight,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 25,
    },
    button: {
        width: '33%',
    },
    cameraContainer: {
        /*flex: 1,*/
        height: cameraContainerHeight,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    triggerButton: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    triggerButtonChild: {
        borderRadius: 35,
        height: 70,
        width: 70,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
    },
    text:{
        color: colors.white,
        textAlign: 'center'
    }

})
