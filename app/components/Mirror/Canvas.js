import React, {useState} from "react";
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    TouchableHighlight
} from "react-native";
import * as Yup from "yup";
import Screen from "../Screen";
import colors from "../../config/colors";
import ProfilePost from "../profile/ProfilePost";

const paddingItem = 10
const canvasMargin = 0
const canvasWidth = Dimensions.get('window').width
const canvasHeight = canvasWidth
const itemWidth = (canvasWidth - 4 * paddingItem - 2 * canvasMargin) / 3
const itemHeight = itemWidth

export default function Canvas({outfit, edit}) {
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const topRowItems = outfit.slice(0, 3).filter(item => item).length
    const middleRowItems = outfit.slice(3, 6).filter(item => item).length
    const bottomRowItems = outfit.slice(6, 9).filter(item => item).length

    function CanvasItem({currItem, imageUrl}) {
        const deleteItem = () => {
            outfit.indexOf(currItem)
            const index = outfit.indexOf(currItem)
            outfit[index] = null
            forceUpdate()
        }

        return (
            <TouchableWithoutFeedback onPress={edit ? deleteItem : null}>
                <View style={styles.imageContainer}>

                    <Image
                        source={{uri: imageUrl}}
                        style={styles.image}
                    />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={[styles.container, {
            height: edit ? canvasHeight : canvasHeight + 50,
            marginBottom: edit ? 0 : -50,
            borderRadius: edit ? 50 : 0
        }]}>
            <View style={[styles.row]}>
                {
                    topRowItems === 0 ?
                    <View style={{height: itemHeight + paddingItem}}/> :
                    outfit.slice(0, 3).filter(item => item).map((item) => <CanvasItem currItem={item} key={item.id}
                                                                                          imageUrl={item.signedUrl}/>)
                }
            </View>
            <View style={styles.row}>
                {
                    middleRowItems === 0 ?
                    <View style={{height: itemHeight + paddingItem}}/> :
                    outfit.slice(3, 6).filter(item => item).map((item) => <CanvasItem currItem={item} key={item.id}
                                                                                   imageUrl={item.signedUrl}/>)}
            </View>
            <View style={styles.row}>
                {
                    bottomRowItems === 0 ?
                        <View style={{height: itemHeight + paddingItem}}/> :
                    outfit.slice(6, 9).filter(item => item).map((item) => <CanvasItem currItem={item} key={item.id}
                                                                                   imageUrl={item.signedUrl}/>)}
            </View>
        </View>

    )
        ;
}

const styles = StyleSheet.create({
    container: {
        width: canvasWidth,
        height: canvasHeight + 50,
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-evenly',
        paddingVertical: paddingItem / 2,
        backgroundColor: colors.white,
        marginBottom: -50
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});
