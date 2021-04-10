import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {Dimensions} from 'react-native';
import colors from "../config/colors";
import {Entypo} from "@expo/vector-icons";
import AppButton from "../components/Button";

const windowWidth = Dimensions.get('window').width

export default function PictureTakenScreen({route, navigation}) {

    const pictureUri = route.params.picture
    const pictureBase64 = route.params.base64

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topButtonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="cross" size={35} color="white" style={styles.backButton}/>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                {route.params.picture &&
                <Image source={{uri: pictureUri}} style={{width: '100%', height: '100%'}}/>}
            </View>
            <View style={styles.bottomButtonContainer}>
                <AppButton title={'continue'} onPress={()=> navigation.push('createPost', {picture: pictureUri, base64: pictureBase64})}/>
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
        height: windowWidth,
        width: windowWidth
    },
    topButtonContainer:{
        position: 'absolute',
        top: 80,
        left: 15
    },
    bottomButtonContainer:{
        position: 'absolute',
        bottom: 40,
        right: 40
    },
})