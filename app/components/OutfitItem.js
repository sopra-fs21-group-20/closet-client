import React, {createRef, useEffect, useRef, useState} from "react";
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
import {useFormik, useFormikContext} from "formik";
import Image2 from "./Image";

const validationSchema = Yup.object().shape({
    image: Yup.array().min(1, "Please select at least one image."),
    title: Yup.string().label("Title"),
    brand: Yup.string().label("Brand"),
    badges: Yup.array().min(1, "Please select at least one attribute."),
});

const actionSheetRef = createRef();

function OutfitItem({
                        state,
                        setStateFunc,
                        data = {},
                        setDataFunc,
                        modalCloseFunc,
                        editMode,
                        index,
                        deleteFunc,
                        addFunc
                    }) {

    const [forceUpdate, setForceUpdate] = useState(0);

    const form = useRef();

    let badgeColor = "";
    if (data.attributes) {
        badgeColor = data.attributes.color;
    }

    const handleSubmit = async (listing) => {
        if (listing.title === "") return Alert.alert("Please fill out the title.");
        if (listing.brand === "") return Alert.alert("Please fill out the brand.");
        if (Object.keys(data.attributes).length === 0) return Alert.alert("Please add at least one attribute.");
        if (listing.image[0] === null) return Alert.alert("Please add an image.");

        const tempData = data;
        tempData.name = listing.title;
        tempData.brand = listing.brand;
        tempData.attributes = data.attributes;
        if (listing.image[0].base64) tempData.image = listing.image[0].base64;
        tempData.signedUrl = listing.image[0].uri;
        tempData.price = 0;
        tempData.public = true;
        tempData.isPublic = true;

        addFunc(tempData);
        resetComponent();
        modalCloseFunc(false);
    };

    const resetComponent = () => {
        form.current?.resetForm();
        setStateFunc(2);
        setDataFunc({});
    }

    const showActionSheet = () => {
        actionSheetRef.current?.setModalVisible();
    }

    const newAttribute = (key, value) => {
        const tempAttributes = data.attributes ? data.attributes : {};
        tempAttributes[key] = value;
        data.attributes = tempAttributes;
        setDataFunc(data);
        setForceUpdate(forceUpdate + 1);
    }

    const changeMode = () => {
        setStateFunc(3);
    }

    switch (state) {
        case 3: // Modal edit view
            return (
                <View style={[styles.container, stylesPopup.container]}>
                    <TouchableOpacity onPress={() => {
                        resetComponent();
                        modalCloseFunc(false);
                    }} style={[stylesPopup.closeIconContainer]}>
                        <MaterialCommunityIcons
                            name="close"
                            color={colors.white}
                            style={stylesPopup.closeIcon}
                            size={20}/>
                    </TouchableOpacity>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "position" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
                    >
                        <Form
                            initialValues={{
                                image: [data?.signedUrl ? {uri: data?.signedUrl, base64: ""} : null],
                                title: data?.name ? data?.name : "",
                                brand: data?.brand ? data?.brand : "",
                            }}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                            innerRef={form}
                        >
                            <ScrollView style={stylesPopup.scrollView} persistentScrollbar={true}>
                                <PostImagePicker name="image" base64={true} forceUpdateFunc={setForceUpdate}
                                                 forceUpdateVal={forceUpdate}/>
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
                                        {
                                            data.attributes &&
                                            Object.keys(data.attributes).length !== 0 &&
                                            Object.entries(data.attributes).map(([key, value], i) =>
                                                <Badge key={i} type={key}>{value}</Badge>
                                            )
                                        }
                                        <Badge type={"new"} onPressFunction={showActionSheet}>New...</Badge>
                                    </Text>
                                </View>
                                <NewBadge refObj={actionSheetRef} newBadgeFunc={newAttribute}/>
                            </ScrollView>
                            <View style={stylesPopup.buttonContainer}>
                                <Button title="Abort" buttonStyle={stylesPopup.buttonAbort}
                                        onPress={() => {
                                            resetComponent();
                                            modalCloseFunc(false);
                                        }}/>
                                <SubmitButton title="Save" buttonStyle={stylesPopup.buttonSave}/>
                            </View>
                        </Form>
                    </KeyboardAvoidingView>
                </View>
            );
        case 2: // Modal view
            return (
                <>
                    <View style={[styles.container, stylesPopup.container]}>
                        <TouchableOpacity onPress={() => {
                            modalCloseFunc(false);
                        }} style={stylesPopup.closeIconContainer}>
                            <MaterialCommunityIcons
                                name="close"
                                color={colors.white}
                                style={stylesPopup.closeIcon}
                                size={20}/>
                        </TouchableOpacity>
                        <View style={stylesPopup.scrollView}>
                            <Image2 style={stylesPopup.image} source={{uri: data.signedUrl}} resizeMode={"cover"}/>
                            <View style={stylesPopup.textContainer}>
                                <Text style={stylesPopup.title}>{data.name}</Text>
                                <Text style={stylesPopup.text}>{data.brand}</Text>
                            </View>
                            <View style={stylesPopup.badgeContainer}>
                                <Text>
                                    {
                                        data.attributes && Object.entries(data.attributes).map(([key, value], i) =>
                                            <Badge
                                                key={i} color={badgeColor}>{value}</Badge>)
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={stylesPopup.buttonContainer}>
                            <Button title="Delete" buttonStyle={stylesPopup.buttonDelete} onPress={async () => {
                                const tempDataId = data.id;
                                deleteFunc(tempDataId, true, () => {
                                    resetComponent();
                                });
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
                <TouchableOpacity>
                    <View style={stylesList.item}>
                        <Image2 source={{uri: data.signedUrl}} style={stylesList.image}/>
                        <View style={stylesList.information}>
                            <Text><Text style={stylesList.title}>{data.name}</Text> | <Text
                                style={stylesList.brand}>{data.brand}</Text></Text>
                            <Text style={stylesList.attributes}>
                                {
                                    data.attributes && Object.entries(data.attributes).map(([key, value], i) => <Badge
                                        key={i} color={badgeColor} pressable={false}>{value}</Badge>)
                                }
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        default: // Square image view
            return (
                <View style={stylesSquare.wrapper}>
                    <View style={[styles.container, stylesSquare.container]}>
                        <View style={{display: (editMode ? "flex" : "none")}}>
                            <TouchableOpacity onPress={() => {
                                deleteFunc(data.id);
                            }} style={[styles.deleteIconContainer]}>
                                <MaterialCommunityIcons
                                    name="trash-can-outline"
                                    color={colors.white}
                                    style={styles.deleteIcon}
                                    size={20}/>
                            </TouchableOpacity>
                        </View>
                        <Image2 style={stylesSquare.image} source={{uri: data.signedUrl}} resizeMode={"cover"}/>
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

const stylesList = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.white,
        height: 80,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        position: "relative",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    information: {
        flex: 1,
        marginLeft: 20
    },
    title: {
        fontSize: 20,
        color: colors.dark,
        fontWeight: '700',
    },
    brand: {
        fontSize: 20,
        color: colors.darker,
    },
    attributes: {
        flexDirection: 'row',
        marginTop: 10,
    },
});

const stylesPopup = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 0,
        paddingHorizontal: 40,
    },
    container: {
        width: '100%',
        paddingTop: 30,
        paddingBottom: 15,
        flexDirection: "column",
        position: "relative",
        marginVertical: 30,
    },
    scrollView: {
        marginBottom: 80,
        paddingHorizontal: 15,
    },
    closeIconContainer: {
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
    closeIcon: {},
    image: {
        width: (Dimensions.get("window").width - 80),
        height: (Dimensions.get("window").width - 80),
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
        padding: 15,
        paddingBottom: 0,
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        width: '100%',
        borderTopColor: colors.dark,
        borderTopWidth: 1,
        zIndex: 10,
        backgroundColor: colors.white,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
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
