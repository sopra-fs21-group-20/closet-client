import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import colors from "../../config/colors";
import Canvas from "./Canvas";
import TextInput from "../TextInput";
import AppButton from "../Button";

const DATA =
    [
        null,
        {
            id: 2,
            name: 'Diesel Jeans Jacket',
            attributes: ['retro'],
            uri: 'https://img01.ztat.net/article/spp-media-p1/f74f14c70e22372bb559bc655c080ac5/43891ebf79c4462088c45ac62fd18249.jpg?imwidth=1800&filter=packshot'
        },
        null,
        {
            id: 3,
            name: "Jack & Jones' Pants",
            attributes: ['slim fit'],
            uri: 'https://img01.ztat.net/article/spp-media-p1/008a480179193efbaee7ff6434d528e6/614b9211afb64a61982d4978d7be2dec.jpg?imwidth=1800&filter=packshot'
        },
        null,
        null,
        {
            id: 4,
            name: 'Polo Shoes',
            attributes: ['comfortable'],
            uri: 'https://cdn.shopify.com/s/files/1/0706/6863/products/Royal-Black-Site-1_786cdc4b-c7e9-4214-939e-ff07335a8cb9.jpg?v=1571605462'
        },
        null,
        null
    ]


export default function CreateOutfit() {

    const [outfit, setOutfit] = useState(DATA)
    const [title, onChangeTitle] = useState(null)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const addItem = () => {
        DATA[0] = {
            id: 1,
            name: 'Dsquared Shirt',
            attributes: ['expensive ', 'oversize fit'],
            uri: 'https://img01.ztat.net/article/spp-media-p1/64a3bd02da914ed9b2ea51ad249803b7/6e32f0973d0f40a88becfcb2eee977b4.jpg?imwidth=1800&filter=packshot'
        };
        setOutfit(DATA)
        console.log('set Outfit', outfit)
        forceUpdate()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTitle}
                    value={title}
                    placeholder={'Title'}
                />
            </View>
            <Canvas style={styles.canvas} outfit={outfit} edit={true}/>
            <View style={{alignItems: 'center', marginVertical: 10}}>
                <Text style={styles.chooseText}>Choose the row you want to edit:</Text>
            </View>
            <View style={styles.viewContainer}>
                <TouchableOpacity onPress={addItem} style={styles.view}>
                    <Text style={styles.text}>Top</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.view}>
                    <Text style={styles.text}>Middle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.view}>
                    <Text style={styles.text}>Bottom</Text>
                </TouchableOpacity>
            </View>
            <AppButton title={'create'} buttonStyle={{width: '70%'}}/>
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
        height: 70,
        alignItems: 'center',
        width: '70%',
        alignSelf: 'center'
    },
    input: {}
});
