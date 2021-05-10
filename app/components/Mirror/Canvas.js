import React from "react";
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    TouchableWithoutFeedback, SafeAreaView,
} from "react-native";
import colors from "../../config/colors";

const paddingItem = 10
const canvasMargin = 0
const canvasWidth = Dimensions.get('window').width
const canvasHeight = canvasWidth
const itemWidth = (canvasWidth - 4 * paddingItem - 2 * canvasMargin) / 3
const itemHeight = itemWidth

export default function Canvas({outfit, edit, modal, deleteFunc}) {

    const topRowItems = outfit.filter(item => item.position>=0 && item.position<3);
    const middleRowItems = outfit.filter(item => item.position>=3 && item.position<6);
    const bottomRowItems = outfit.filter(item => item.position>=6 && item.position<9);

    function CanvasItem({currItem, imageUrl}) {

        return (
            <TouchableWithoutFeedback onPress={() => {
                if(edit) deleteFunc(currItem.id);
            }}>
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
        <SafeAreaView style={[styles.container, {
            height: edit || modal ? canvasHeight : canvasHeight + 50,
            marginBottom: edit ? 0 : -50,
            borderRadius: edit || modal  ? 50 : 0,
        }]}>
            <View style={[styles.row]}>
                {
                    topRowItems.length === 0 ?
                    <View style={{height: itemHeight + paddingItem}}/> :
                    topRowItems.map((item, index) => <CanvasItem currItem={item} key={'top' + item.id + index}
                                                                                          imageUrl={item.signedUrl}/>)
                }
            </View>
            <View style={styles.row}>
                {
                    middleRowItems.length === 0 ?
                    <View style={{height: itemHeight + paddingItem}}/> :
                        middleRowItems.map((item, index) => <CanvasItem currItem={item} key={'mid' + item.id + index}
                                                                                   imageUrl={item.signedUrl}/>)}
            </View>
            <View style={styles.row}>
                {
                    bottomRowItems.length === 0 ?
                        <View style={{height: itemHeight + paddingItem}}/> :
                        bottomRowItems.map((item, index) => <CanvasItem currItem={item} key={'bot' + item.id + index}
                                                                                   imageUrl={item.signedUrl}/>)}
            </View>
        </SafeAreaView>

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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
});
