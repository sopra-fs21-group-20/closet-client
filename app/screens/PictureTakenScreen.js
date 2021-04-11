import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, Dimensions} from 'react-native';
import colors from "../config/colors";
import {Entypo} from "@expo/vector-icons";
import AppButton from "../components/Button";

const dimensions = Dimensions.get('window')

//todo pass imageRatio as prop
export default function PictureTakenScreen({route, navigation}) {

    const pictureUri = route.params.picture
    const pictureBase64 = route.params.base64
    const topButtonContainerHeight = (dimensions.height-dimensions.width * route.params.cameraDimensions) * 0.4
    const imageDimensions = dimensions.width * route.params.cameraDimensions
    const bottomButtonContainerHeight = (dimensions.height-dimensions.width * route.params.cameraDimensions) * 0.6

    console.log(topButtonContainerHeight, imageDimensions, bottomButtonContainerHeight)

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.topButtonContainer, topButtonContainerHeight]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="cross" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={[styles.imageContainer, {height: imageDimensions}]}>
                {route.params.picture &&
                <Image source={{uri: pictureUri}} style={{width: '100%', height: '100%'}}/>}
            </View>
            <View style={[styles.bottomButtonContainer, {height: bottomButtonContainerHeight}]}>
                <AppButton title={'continue'} onPress={()=> {navigation.push('createPost', {picture: pictureUri, base64: pictureBase64})}}/>
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
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        bottom: 100,
    },
    button: {
        width: '33%',
    },
    imageContainer: {
        width: dimensions.width
    },
    bottomButtonContainer:{
        width: '100%',
        /*height: (dimensions.height-dimensions.width * (1 + 1/3)) * 0.6,*/
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    topButtonContainer:{
        width:'100%',
        /*height: (dimensions.height-dimensions.width * (1 + 1/3)) * 0.4,*/
        justifyContent: 'flex-end',
        paddingLeft: 25,
        paddingBottom: 25
    },
})