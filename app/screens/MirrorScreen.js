import React, {useCallback, useEffect, useRef, useState} from "react";
import {
    Alert,
    Animated,
    Image,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import Canvas from "../components/Mirror/Canvas";
import CanvasItems from "../components/Mirror/CanvasItems";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import outfitApi from "../api/outfitApi";
import AppButton from "../components/Button";
import {useNavigation, useRoute} from "@react-navigation/native";
import ActivityIndicator from "../components/ActivityIndicator";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function MirrorScreen({menuOpen, isInjected = false}) {

    const getOutfitApi = useApi(outfitApi.getOutfits);
    const deleteOutfitApi = useApi(outfitApi.deleteOutfit);

    useEffect(() => {
        getOutfitApi.request();
    }, []);


    /*const outfits = [
        {
            id: 3,
            name: 'My 1st outfit',
            userId: 1,
            itemPositions: [
                {id: 19, position: 0},
                {id: 9, position: 1},
                {id: 6, position: 3},
                {id: 8, position: 6},
            ],
            outfitItems: [
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
            ],
            collectionIds: [
                2
            ]
        },
        {
            id: 4,
            name: 'My 2nd outfit',
            userId: 1,
            itemPositions: [
                {id: 19, position: 0},
                {id: 9, position: 1},
                {id: 6, position: 3},
                {id: 8, position: 6},
            ],
            outfitItems: [
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
            ],
            collectionIds: [
                2
            ]
        },
    ];*/

    /*const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
    }, []);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50
    }*/

    const scrollX = React.useRef(new Animated.Value(0)).current;

    const route = useRoute();

    const navigation = useNavigation();

    const {picture, base64, reload} = isInjected ? route.params : {picture: null, base64: null};

    useEffect(() => {
        route.params?.reload ? getOutfitApi.request() : null;
    }, [route]);

    const onRefresh = () => {
        getOutfitApi.request();
    };

    const [currentOutfit, setCurrentOutfit] = useState(0);

    const onScrollEnd = (e) => {
        const contentOffset = e.nativeEvent.contentOffset;
        const viewSize = e.nativeEvent.layoutMeasurement;
        const pageNum = Math.floor(contentOffset.x / viewSize.width);
        setCurrentOutfit(pageNum);
    }

    const flatlist = useRef();

    const goToPrevPage = () => {
        if (currentOutfit === 0) return;
        flatlist.current.scrollToIndex({
            index: (currentOutfit - 1),
            animated: true,
        });
        setCurrentOutfit(currentOutfit - 1);
    };

    const goToNextPage = () => {
        if (currentOutfit >= getOutfitApi.data.length - 1) return;
        flatlist.current.scrollToIndex({
            index: (currentOutfit + 1),
            animated: true,
        });
        setCurrentOutfit(currentOutfit + 1);
    };

    const deleteFromMirror = (id) => {
        console.log("id", id);
        Alert.alert("Confirm deletion:", "Are you sure you want to delete this outfit?", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: async () => {
                    if (getOutfitApi.data.find(item => item.id === id)) {
                        const result = await deleteOutfitApi.request(id);

                        if (!result.ok) {
                            return alert(result.data?.message ? result.data.message : "Something went wrong.");
                        }

                        getOutfitApi.setData(getOutfitApi.data.filter(item => item.id !== id));
                    }
                },
            },
        ]);
    }

    return (
        <View style={{flex: 1}}>
            <ActivityIndicator visible={getOutfitApi.loading}/>
            {getOutfitApi.data.length >= 1 ? <Screen>
                {currentOutfit !== 0 && <TouchableOpacity onPress={() => {
                    goToPrevPage();
                }} style={[styles.navButton, styles.prevButton]}>
                    <MaterialCommunityIcons
                            name="chevron-left"
                            color={colors.white}
                            size={40}/>
                </TouchableOpacity>}
                {currentOutfit !== getOutfitApi.data.length -1 && <TouchableOpacity onPress={() => {
                    goToNextPage();
                }} style={[styles.navButton, styles.nextButton]}>
                    <MaterialCommunityIcons
                            name="chevron-right"
                            color={colors.white}
                            size={40}/>
                </TouchableOpacity>}
                <ScrollView style={[styles.container, {marginTop: menuOpen ? (Platform.OS === "ios" ? 110 : 0) : (Platform.OS === "ios" ? 0 : -20),}]} refreshControl={
                    <RefreshControl
                        refreshing={getOutfitApi.loading}
                        onRefresh={onRefresh}
                        colors={[colors.light]}
                        tintColor={colors.light}
                    />
                }>
                    <Animated.FlatList
                        horizontal={true}
                        scrollEventThrottle={32}
                        onScroll={Animated.event(
                            [{nativeEvent: {contentOffset: {x: scrollX}}}],
                            {useNativeDriver: false})}
                        onMomentumScrollEnd={onScrollEnd}
                        keyExtractor={(item) => item.id.toString()}
                        data={getOutfitApi.data}
                        pagingEnabled={true}
                        ref={flatlist}
                        renderItem={({item}) => {
                            return <View>
                                <Canvas outfit={item.outfitItems} positions={item.itemPositions}
                                        key={`canvas-${item.id}`}/>
                                <CanvasItems outfit={item} key={`canvasItem-${item.id}`} deleteFunc={deleteFromMirror} isInjected={isInjected} itemId={item.id}/>
                            </View>
                        }}/>
                </ScrollView>
                {isInjected && <View style={styles.chooseOutfitContainer}>
                    <AppButton title={'choose this outfit'} onPress={() => {
                        navigation.push('createPost', {
                            picture: picture,
                            base64: base64,
                            outfitId: getOutfitApi.data[currentOutfit].id,
                            outfitName: getOutfitApi.data[currentOutfit].name
                        });
                    }}/>
                </View>}
            </Screen> :
            <Screen style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: colors.light}}>Seems like you have not created any outfits yet. Click on the plus to change that.</Text>
            </Screen>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    canvasContainer: {
        backgroundColor: colors.dark,
        height: '100%',
        width: '100%',
    },
    itemsContainer: {
        marginTop: -60,
        bottom: 0,
        width: '100%',
        backgroundColor: colors.lighter,
        borderRadius: 50,
        padding: 25,
    },
    chooseOutfitContainer: {
        width: '100%',
        padding: 10,
        paddingBottom: 0,
    },
    navButton: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: colors.dark,
        width: 60,
        height: 60,
        top: 170,
        justifyContent: "center",
    },
    prevButton: {
        left: -30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "flex-end",
    },
    nextButton: {
        right: -30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        alignItems: "flex-start",
    },
});
