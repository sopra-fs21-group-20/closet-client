import React, {createRef, useEffect, useState} from "react";
import {
    View,
    StyleSheet,
    Image,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    Alert, Platform, KeyboardAvoidingView, ScrollView
} from "react-native";
import Text from "./Text";
import colors from "../config/colors";
import Badge from "./Badge";
import Button from "./Button";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PostImagePicker from "./forms/PostImagePicker";
import {Form, FormField, SubmitButton} from "./forms";
import * as Yup from "yup";
import fabrics from "../config/fabrics";
import ImageInput from "./ImageInput";
import Screen from "./Screen";
import NewBadge from "./NewBadge";
import ActionSheet from "react-native-actions-sheet";

const validationSchema = Yup.object().shape({
    image: Yup.array().min(1, "Please select at least one image."),
    title: Yup.string().label("Title"),
    brand: Yup.string().label("Brand"),
    badges: Yup.array().min(1, "Please select at least one image."),
});

const actionSheetRef = createRef();

function OutfitItem({state = 2, data = {}, modalCloseFunc, editMode, index, deleteFunc, addFunc}) {

    let badgeColor = "";
    if (data.attributes) {
        badgeColor = data.attributes.color;
    }

    const handleSubmit = async (listing, {resetForm}) => {
        console.log("listing", listing);
    };

    const [modalState, setModalState] = useState(state);

    const [modalData, setModalData] = useState(data);

    const [newBadgeShown, setNewBadgeShown] = useState(false);

    const [actionSheetShown, setActionSheetShown] = useState(false);

    const showActionSheet = () => {
        actionSheetRef.current?.setModalVisible();
    }

    const newAttribute = (key, value) => {
        const newModalData = modalData.attributes[key] = value;
        setModalData(newModalData);
    }

    const changeMode = () => {
        setModalState(3);
    }

    switch (modalState) {
        case 3: // Modal edit view
            return (
                <>
                    <ScrollView style={[styles.container, stylesPopup.container]}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                        >
                            <Form
                                initialValues={{
                                    image: [],
                                    title: "",
                                    brand: "",
                                    badges: [],
                                }}
                                onSubmit={handleSubmit}
                                validationSchema={validationSchema}
                            >
                                {/*
                                    <Image source={{uri: "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C410QkIAyiRL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_UL1500_.png"}} style={stylesPopup.image} resizeMode={"cover"}/>
*/}
                                {/*<PostImagePicker name="image"/>*/}
                                <ImageInput imageUri={data.signedUrl ? data.signedUrl : null}/>
                                <FormField
                                    maxLength={100}
                                    name="title"
                                    numberOfLines={1}
                                    placeholder="Title"
                                    value={data.name ? data.name : ""}
                                />
                                <FormField
                                    maxLength={100}
                                    name="brand"
                                    numberOfLines={1}
                                    placeholder="Brand"
                                    value={data.brand ? data.brand : ""}
                                />
                                <View style={stylesPopup.badgeContainer}>
                                    <Text>
                                        {
                                            data.attributes && Object.keys(data.attributes).length !== 0 &&
                                            Object.entries(data.attributes).map(([key, value], i) =>
                                                <Badge key={i} type={key}>{value}</Badge>
                                            )
                                        }
                                        <Badge type={"new"} onPressFunction={showActionSheet}>New...</Badge>
                                    </Text>
                                </View>
                                <NewBadge refObj={actionSheetRef} newBadgeFunc={newAttribute}/>
                                <View style={stylesPopup.buttonContainer}>
                                    <Button title="Abort" buttonStyle={stylesPopup.buttonAbort}
                                            onPress={() => {
                                                modalCloseFunc(false);
                                            }}/>
                                    <Button title="Save" buttonStyle={stylesPopup.buttonSave} onPress={() => {
                                        addFunc({
                                            id: 7,
                                            categoryId: 3,
                                            name: "Pullover",
                                            brand: "Champion",
                                            attributes: {
                                                color: "rgb(150,150,150)",
                                                fabric: fabrics.WOOL,
                                            },
                                            signedUrl: "https://www.houseofkids.com/media/catalog/product/cache/1/image/960x/9df78eab33525d08d6e5fb8d27136e95/5/f/5f292d079c742Champion-sweat-305379-em031_-1_Front_website.webp",
                                        });
                                        modalCloseFunc(false);
                                    }}/>
                                </View>
                            </Form>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </>
            );
        case 2: // Modal view
            return (
                <>
                    <View style={[styles.container, stylesPopup.container]}>
                        <Image style={stylesPopup.image} source={{uri: data.signedUrl}} resizeMode={"cover"}/>
                        <View style={stylesPopup.textContainer}>
                            <Text style={stylesPopup.title}>{data.name}</Text>
                            <Text style={stylesPopup.text}>{data.brand}</Text>
                        </View>
                        <View style={stylesPopup.badgeContainer}>
                            <Text>
                                {
                                    Object.entries(data.attributes).map(([key, value], i) => <Badge key={i} color={badgeColor}>{value}</Badge>)
                                }
                            </Text>
                        </View>
                        <View style={stylesPopup.buttonContainer}>
                            <Button title="Delete" buttonStyle={stylesPopup.buttonDelete} onPress={() => {
                                deleteFunc(data.id, true)
                            }}/>
                            <Button title="Edit" buttonStyle={stylesPopup.buttonEdit} onPress={() => {
                                changeMode(3);
                            }}/>
                        </View>
                    </View>
                </>
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
        maxHeight: Dimensions.get("screen").height - 90,
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
        flexDirection: "column",
        position: "relative",
        flexGrow: 0,
    },
    image: {
        width: (Dimensions.get("window").width - 110),
        height: (Dimensions.get("window").width - 110),
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
    newBadgeContainer: {
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
