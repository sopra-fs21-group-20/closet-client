import React from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    TouchableWithoutFeedback, SafeAreaView, TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const paddingItem = 10
const canvasMargin = 0
const canvasWidth = Dimensions.get('window').width
const canvasHeight = canvasWidth
const itemWidth = (canvasWidth - 4 * paddingItem - 2 * canvasMargin) / 3
const itemHeight = itemWidth

export default function Canvas({outfit, positions, edit = false, modal, deleteFunc, addFunc}) {

    const isInRow = (item, row) => {
        const position = positions.find(pos => pos.id === item.id);
        return position.position >= row * 3 && position.position < (row + 1) * 3;
    }

    const topRowItems = outfit.filter(item => isInRow(item, 0));
    const middleRowItems = outfit.filter(item => isInRow(item, 1));
    const bottomRowItems = outfit.filter(item => isInRow(item, 2));

    const allItems = [topRowItems, middleRowItems, bottomRowItems];

    function CanvasItem({currItem, imageUrl}) {

        return (
            <TouchableOpacity onPress={() => {
                if(edit) deleteFunc(currItem.id);
            }}>
                <View style={styles.imageContainer}>

                    <Image
                        source={{uri: imageUrl}}
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={[styles.container, {
            height: edit || modal ? canvasHeight : canvasHeight + 50,
            marginBottom: edit ? 0 : -50,
        }]}>
            {allItems.map((itemRow, index) =>
            <View style={[styles.row]} key={index}>
                {itemRow.map((item, index2) => <CanvasItem currItem={item} key={item.id + index2}
                                                                                          imageUrl={item.signedUrl}/>)}
                {
                        edit && itemRow.length !== 3 ?
                            <TouchableOpacity onPress={() => {
                                addFunc(index);
                            }}>
                                <View style={styles.newItem}>
                                    <MaterialCommunityIcons
                                        name="plus"
                                        color={colors.white}
                                        style={styles.newItemIcon}
                                        size={60}/>
                                </View>
                            </TouchableOpacity> :
                            allItems.length === 0 ? <View style={{height: itemHeight + paddingItem}}/> : null
                }
            </View>)}
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        width: canvasWidth,
        height: canvasHeight + 50,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
        paddingVertical: paddingItem / 2,
        backgroundColor: colors.white,
        marginBottom: -50,
        alignSelf:'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    imageContainer: {
        width: itemWidth,
        height: itemHeight,
        marginVertical: paddingItem / 2,
    },
    newItem: {
        width: itemWidth,
        height: itemHeight,
        marginVertical: paddingItem / 2,
        backgroundColor: colors.whitish,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});
