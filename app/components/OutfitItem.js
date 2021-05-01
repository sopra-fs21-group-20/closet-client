import React, {useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    Alert
} from "react-native";
import Text from "./Text";
import colors from "../config/colors";
import Badge from "./Badge";
import Button from "./Button";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PostImagePicker from "./forms/PostImagePicker";
import {Form, FormField, SubmitButton} from "./forms";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    image: Yup.array().min(1, "Please select at least one image."),
    title: Yup.string().label("Title"),
    brand: Yup.string().label("Brand"),
    badges: Yup.array().min(1, "Please select at least one image."),
});

function OutfitItem({state = 0, data, modalCloseFunc, editMode, index, deleteFunc}) {

    let badgeColor = "";
    if (data.attributes) {
        badgeColor = data.attributes.color;
    }

    const handleSubmit = async (listing, {resetForm}) => {
        console.log('Submit');
    };

    switch (state) {
        case 3: // Modal edit view
            return (
                <TouchableWithoutFeedback onPress={() => {
                    modalCloseFunc(false);
                }}>
                    <View style={stylesPopup.background}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.container, stylesPopup.container]}>
                                <Form
                                    initialValues={{
                                        images: [],
                                        title: "",
                                        brand: "",
                                        badges: [],
                                    }}
                                    onSubmit={handleSubmit}
                                    validationSchema={validationSchema}
                                >
                                    <Image style={stylesPopup.image} resizeMode={"cover"}/>
                                    {/*<PostImagePicker name="image"/>*/}
                                    <FormField
                                        maxLength={100}
                                        name="title"
                                        numberOfLines={1}
                                        placeholder="Title"
                                    />
                                    <FormField
                                        maxLength={100}
                                        name="brand"
                                        numberOfLines={1}
                                        placeholder="Brand"
                                    />
                                    <View style={stylesPopup.badgeContainer}>
                                        <Text>
                                            <Badge>Test</Badge>
                                            <Badge>Test</Badge>
                                        </Text>
                                    </View>
                                    <View style={stylesPopup.buttonContainer}>
                                        <Button title="Delete" buttonStyle={stylesPopup.buttonAbort} onPress={() => {
                                            modalCloseFunc(false);
                                        }}/>
                                        <SubmitButton title="Save" buttonStyle={stylesPopup.buttonSave}/>
                                    </View>
                                </Form>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            );
        case 2: // Modal view
            return (
                <TouchableWithoutFeedback onPress={() => {
                    modalCloseFunc(false);
                }}>
                    <View style={stylesPopup.background}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.container, stylesPopup.container]}>
                                <Image style={stylesPopup.image} source={{uri: data.signedUrl}} resizeMode={"cover"}/>
                                <View style={stylesPopup.textContainer}>
                                    <Text style={stylesPopup.title}>{data.name}</Text>
                                    <Text style={stylesPopup.text}>{data.brand}</Text>
                                </View>
                                <View style={stylesPopup.badgeContainer}>
                                    <Text>
                                        {
                                            Object.entries(data.attributes).map(([key, value], i) => {
                                                if (key !== "color") return (
                                                    <Badge key={i} color={badgeColor}>{value}</Badge>);
                                            })
                                        }
                                    </Text>
                                </View>
                                <View style={stylesPopup.buttonContainer}>
                                    <Button title="Delete" buttonStyle={stylesPopup.buttonDelete} onPress={() => {
                                        deleteFunc(data.id, true)
                                    }}/>
                                    <Button title="Edit" buttonStyle={stylesPopup.buttonEdit} onPress={() => {
                                    }}/>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            );
        case 1: // List view
            return (
                <></>
            );
        default: // Square image view
            return (
                <View style={stylesSquare.wrapper}>
                    <View style={[styles.container, stylesSquare.container]}>
                        <TouchableOpacity onPress={() => {
                            deleteFunc(data.id);
                        }} style={[styles.deleteIconContainer, {display: (editMode ? "flex" : "none")}]}>
                            <MaterialCommunityIcons
                                name="trash-can-outline"
                                color={colors.white}
                                style={styles.deleteIcon}
                                size={20}/>
                        </TouchableOpacity>
                        <Image style={stylesSquare.image} source={{uri: data.signedUrl}} resizeMode={"cover"}/>
                    </View>
                </View>
            );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 5,
        position: "relative",
    },
    deleteIconContainer: {
        position: "absolute",
        right: -20,
        top: -20,
        borderRadius: 20,
        width: 40,
        height: 40,
        zIndex: 10,
        backgroundColor: colors.dark,
        justifyContent: "center",
        alignItems: "center",
    },
    deleteIcon: {},
});

const stylesSquare = StyleSheet.create({
    wrapper: {
        paddingTop: 20,
    },
    container: {
        height: 150,
        padding: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    image: {
        width: 'auto',
        height: '100%',
    },
});

const stylesPopup = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 50,
        paddingHorizontal: 40,
    },
    container: {
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
        flexDirection: "column",
        position: "relative",
    },
    image: {
        width: (Dimensions.get("window").width - 110),
        height: (Dimensions.get("window").width - 110),
        tintColor: colors.dark,
    },
    textContainer: {
        flexDirection: "column",
        paddingTop: 30,
        paddingBottom: 15,
    },
    title: {
        color: colors.darker,
        fontSize: 24,
        fontWeight: '700',
    },
    text: {
        color: colors.dark,
        fontSize: 20,
    },
    badgeContainer: {
        flexDirection: "column",
        paddingTop: 15,
        paddingBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        paddingTop: 15,
        justifyContent: "space-between",
    },
    buttonDelete: {
        width: '47.5%',
        backgroundColor: colors.medium
    },
    buttonEdit: {
        width: '47.5%',
        backgroundColor: colors.dark,
    },
    buttonAbort: {
        width: '47.5%',
        backgroundColor: colors.medium
    },
    buttonSave: {
        width: '47.5%',
        backgroundColor: colors.dark,
    },
});

export default OutfitItem;