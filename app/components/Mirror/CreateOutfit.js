import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import colors from "../../config/colors";
import Canvas from "./Canvas";
import TextInput from "../TextInput";
import AppButton from "../Button";
import Form from "../forms/Form";
import UploadScreen from "../../screens/UploadScreen";
import PostImagePicker from "../forms/PostImagePicker";
import {FormField, SubmitButton} from "../forms";
import * as Yup from "yup";
import feed from "../../api/feed";
import {StackActions as navigation} from "react-navigation";
import useLocation from "../../hooks/useLocation";

const {width} = Dimensions.get('screen')

let DATA =
        {
            "name": "My 2nd outfit",
            "items": [
                {
                    "id": 1,
                    "name": 'Dsquared Shirt',
                    "price": 349.0,
                    "attributes": {
                        "color": "black",
                        "pattern": "white"
                    },
                    "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
                },
                {
                    "id": 2,
                    "name": 'Diesel Jeans Jacket',
                    "price": 349.0,
                    "attributes": {
                        "color": "dark blue",
                    },
                    "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
                },
                null,
                {
                    "id": 3,
                    "name": "Jack & Jones' Pants",
                    "price": 349.0,
                    "attributes": {
                        "color": "light blue",
                        "pattern": "slim fit"
                    },
                    "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
                },
                null,
                null,
                {
                    "id": 4,
                    "name": 'Polo Shoes',
                    "price": 349.0,
                    "attributes": {
                        "color": "black",
                        "pattern": "gloss"
                    },
                    "signedUrl": 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
                },
                null,
                null
            ],
            "collectionIds": [
                2
            ]
        }


export default function CreateOutfit() {
    const location = useLocation();
    const [selectedValue, setSelectedValue] = useState("java");
    const [outfit, setOutfit] = useState(DATA)
    const [title, onChangeTitle] = useState(null)
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [selectedLanguage, setSelectedLanguage] = useState();

    const addItem = () => {
        let row = DATA.items.slice(0, 3).filter(item => item).length
        if (row<3){
            DATA.items[row] = {
                "id": 1,
                "name": 'Dsquared Shirt',
                "price": 99,
                "attributes": {'price': 'expensive', 'fit': 'oversize fit'},
                "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
            };
        }
        setOutfit(DATA)
        /*console.log('set Outfit', outfit)*/
        forceUpdate()
    }

    const addMidItem = () => {
        let row = DATA.items.slice(3, 6).filter(item => item).length
        if (row<3){
            DATA.items[3+row] = {
                "id": 1,
                "name": 'Dsquared Shirt',
                "price": 99,
                "attributes": {'price': 'expensive', 'fit': 'oversize fit'},
                "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
            };
        }
        setOutfit(DATA)
        /*console.log('set Outfit', outfit)*/
        forceUpdate()
    }

    const addbottomItem = () => {
        let row = DATA.items.slice(6,9).filter(item => item).length
        if (row<3){
            DATA.items[6+row] = {
                "id": 1,
                "name": 'Dsquared Shirt',
                "price": 99,
                "attributes": {'price': 'expensive', 'fit': 'oversize fit'},
                "signedUrl": 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
            };
        }
        setOutfit(DATA)
        /*console.log('set Outfit', outfit)*/
        forceUpdate()
    }

    const validationSchema = Yup.object().shape({
        outfitTitle: Yup.string().label("OUTFIT NAME"),
    });

    const handleSubmit = async (listing, {resetForm}) => {
        console.log(listing)
        alert(listing.outfitTitle)
        resetForm();
    };

    return (
        <SafeAreaView>
            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />
            <Form
                initialValues={{
                    outfitTitle: "",
                    items: DATA,
                }}
                onSubmit={handleSubmit}
            >
                <Canvas style={styles.canvas} outfit={outfit.items} edit={true}/>
                <FormField
                    maxLength={255}
                    name="outfitTitle"
                    numberOfLines={1}
                    placeholder="Outfit Name"
                    blurOnSubmit={true}
                    returnKeyType={'done'}
                />
                <View style={{alignItems: 'center', marginVertical: 10, marginTop: 20}}>
                    <Text style={styles.chooseText}>Choose the row you want to edit:</Text>
                </View>
                <View style={styles.viewContainer}>
                    <TouchableOpacity onPress={addItem} style={styles.view}>
                        <Text style={styles.text}>Top</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addMidItem} style={styles.view}>
                        <Text style={styles.text}>Middle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={addbottomItem} style={styles.view}>
                        <Text style={styles.text}>Bottom</Text>
                    </TouchableOpacity>
                </View>
                <SubmitButton title="create"/>
            </Form>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
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
});
