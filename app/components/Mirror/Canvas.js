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

export default function Canvas({outfit, edit, modal}) {
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
            if ([0,1,2].includes(index)){
                let newItems = outfit.slice(0,3).filter(item => item)
                let nullToInsert = 3 - newItems.length
                for (let i = 0; i < nullToInsert; i++){
                    newItems.push(null)
                }
                outfit.splice(0, 3, newItems[0], newItems[1], newItems[2] )
            } else if ([3,4,5].includes(index)){
                let newItems = outfit.slice(3,6).filter(item => item)
                let nullToInsert = 3 - newItems.length
                for (let i = 0; i < nullToInsert; i++){
                    newItems.push(null)
                }
                outfit.splice(3, 3, newItems[0], newItems[1], newItems[2] )
            } else if ([6,7,8].includes(index)){
                let newItems = outfit.slice(6,9).filter(item => item)
                let nullToInsert = 3 - newItems.length
                for (let i = 0; i < nullToInsert; i++){
                    newItems.push(null)
                }
                outfit.splice(6, 3, newItems[0], newItems[1], newItems[2] )
            }
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
        <SafeAreaView style={[styles.container, {
            height: edit || modal ? canvasHeight : canvasHeight + 50,
            marginBottom: edit ? 0 : -50,
            borderRadius: edit || modal  ? 50 : 0,
        }]}>
            <View style={[styles.row]}>
                {
                    topRowItems === 0 ?
                    <View style={{height: itemHeight + paddingItem}}/> :
                    outfit.slice(0, 3).filter(item => item).map((item, index) => <CanvasItem currItem={item} key={'top' + item.id + index}
                                                                                          imageUrl={item.signedUrl}/>)
                }
            </View>
            <View style={styles.row}>
                {
                    middleRowItems === 0 ?
                    <View style={{height: itemHeight + paddingItem}}/> :
                    outfit.slice(3, 6).filter(item => item).map((item, index) => <CanvasItem currItem={item} key={'mid' + item.id + index}
                                                                                   imageUrl={item.signedUrl}/>)}
            </View>
            <View style={styles.row}>
                {
                    bottomRowItems === 0 ?
                        <View style={{height: itemHeight + paddingItem}}/> :
                    outfit.slice(6, 9).filter(item => item).map((item, index) => <CanvasItem currItem={item} key={'bot' + item.id + index}
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
