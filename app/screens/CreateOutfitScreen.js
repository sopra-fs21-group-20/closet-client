import React, {createRef, useEffect, useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, FlatList, SafeAreaView, TouchableOpacity, Alert} from "react-native";
import colors from "../config/colors";
import Canvas from "../components/Mirror/Canvas";
import TextInput from "../components/TextInput";
import AppButton from "../components/Button";
import Form from "../components/forms/Form";
import UploadScreen from "./UploadScreen";
import {FormField, SubmitButton} from "../components/forms";
import * as Yup from "yup";
import {StackActions as navigation} from "react-navigation";
import useLocation from "../hooks/useLocation";
import outfitApi from "../api/outfitApi";
import {StackActions, useNavigation} from '@react-navigation/native';
import ActionSheet from "react-native-actions-sheet";
import ClosetScreen from "./ClosetScreen";
import useApi from "../hooks/useApi";
import Screen from "../components/Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";

/*const collectionId = 3;

const positionData = [
    {id: 19, position: 0},
    {id: 9, position: 1},
    {id: 6, position: 3},
    {id: 8, position: 6},
];

const outfitData = [
    {
        id: 19,
        name: 'Shirt',
        brand: 'Dsquared',
        price: 349.0,
        attributes: {
            color: 'black',
            pattern: 'white'
        },
        signedUrl: 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
    },
    {
        id: 9,
        name: 'Jeans Jacket',
        brand: 'Diesel',
        price: 349.0,
        attributes: {
            color: 'dark blue',
        },
        signedUrl: 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
    },
    {
        id: 6,
        name: 'Pants',
        brand: 'Jack & Jones',
        price: 349.0,
        attributes: {
            color: 'light blue',
            pattern: 'slim fit'
        },
        signedUrl: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
    },
    {
        id: 8,
        name: 'Shoes',
        brand: 'Polo',
        price: 349.0,
        attributes: {
            color: 'black',
            pattern: 'gloss'
        },
        signedUrl: 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
    },
];*/

const closetActionSheet = createRef();


export default function CreateOutfitScreen({isInjected = false}) {

    const navigation = useNavigation();

    const [outfit, setOutfit] = useState([]);
    const [position, setPosition] = useState([]);
    const [title, onChangeTitle] = useState(null);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeRow, setActiveRow] = useState(0);
    const [loading, setLoading] = useState(false);

    const deleteItem = (id) => {
        Alert.alert("Delete", "Do you really want to remove this item?", [
            {
                text: "Yes", onPress: () => {
                    setOutfit([...outfit.filter(item => item.id !== id)]);
                    setPosition([...position.filter(item => item.id !== id)]);
                }
            },
            {text: "No"},
        ]);
    }

    const addItem = (item) => {
        closetActionSheet.current?.setModalVisible(false);
        const row = outfit.filter(item => item.position >= (3 * activeRow) && item.position <= (3 * activeRow + 2)).length;
        if (row < 3) {
            setOutfit([...outfit, item]);
            setPosition([...position, {id: item.id, position: 3 * activeRow + row}]);
        }
    }

    const openCloset = (row) => {
        setLoading(true);
        setActiveRow(row);
        showCloset();
    }

    const validationSchema = Yup.object().shape({
        outfitTitle: Yup.string().label("OUTFIT NAME"),
    });

    const handleSubmit = async (formData, {resetForm}) => {
        if (formData.outfitTitle) {
            setProgress(0);
            setUploadVisible(true);
            const data = {
                "name": formData.outfitTitle,
                "items": position.map(({id: itemId, position}) => ({itemId, position})),
                "collectionIds": []
            };
            const result = await outfitApi.addOutfit(
                data,
                (progress) => setProgress(progress));

            if (!result.ok) {
                setUploadVisible(false);
                console.log(data);
                console.log(result);
                return alert("Could not save the outfit");
            }
            resetForm();
            setOutfit([]);
            navigation.navigate(isInjected ? routes.CHOOSEOUTFIT : routes.MIRROR, {reload: true});
        } else {
            Alert.alert("Please enter an outfit name.");
        }
    };

    const showCloset = () => {
        closetActionSheet.current?.setModalVisible();
    };

    return (
        <View style={{flex: 1}}>
            <ActivityIndicator visible={loading}/>
            <Screen>
                <SafeAreaView>
                    <UploadScreen
                        onDone={() => setUploadVisible(false)}
                        progress={progress}
                        visible={uploadVisible}
                    />
                    <Form
                        initialValues={{
                            outfitTitle: "",
                        }}
                        onSubmit={handleSubmit}
                    >
                        <Canvas style={styles.canvas} outfit={outfit} positions={position} edit={true}
                                deleteFunc={deleteItem}
                                addFunc={openCloset}/>
                        <View style={styles.formContainer}>
                            <FormField
                                maxLength={255}
                                name="outfitTitle"
                                numberOfLines={1}
                                placeholder="Outfit Name"
                                blurOnSubmit={true}
                                returnKeyType={'done'}
                            />
                            <SubmitButton title="create"/>
                        </View>
                    </Form>
                    <ActionSheet ref={closetActionSheet} onOpen={() => {setLoading(false)}}>
                        <View style={styles.actionSheet}>
                            <ClosetScreen isInjected={true} injectedItemTapFunc={addItem}/>
                        </View>
                    </ActionSheet>
                </SafeAreaView>
            </Screen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    formContainer: {
        paddingHorizontal: 10,
        paddingVertical: 25,
        backgroundColor: colors.darker,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        color: 'black'
    },
    chooseText: {
        color: 'white',
        fontSize: 22
    },
    canvas: {},
    viewContainer: {
        flexDirection: 'row',
        borderRadius: 10,
    },
    view: {
        backgroundColor: colors.white,
        flex: 1,
        margin: 10,
        height: 80,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7
    },
    titleContainer: {
        paddingTop: 10,
        height: 60,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        color: '#000',
        height: '100%',
        borderColor: '#6E5BAA',
        borderWidth: 1,
        borderRadius: 2,
        alignSelf: 'center',
        backgroundColor: '#ffffff'
    },
    title: {
        color: colors.white,
        fontSize: 30
    },
    actionSheet: {
        backgroundColor: colors.dark,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
});
