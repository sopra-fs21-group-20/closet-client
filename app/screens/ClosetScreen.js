import React, {createRef, useEffect, useRef, useState} from "react";
import {
    Alert,
    Dimensions,
    ImageBackground,
    Platform, RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import Modal from 'react-native-modal';

import Screen from "../components/Screen";
import colors from "../config/colors";
import Carousel, {Pagination} from "react-native-snap-carousel";
import Accordion from "react-native-collapsible/Accordion";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import OutfitItem from "../components/OutfitItem";
import categories from "../config/categories";
import useApi from "../hooks/useApi";
import outfitApi from "../api/outfitApi";
import ModalLike from "../components/ModalLike";
import ActivityIndicator from "../components/ActivityIndicator";
import UploadScreen from "./UploadScreen";


const filterCategories = (categories, closetItems) => {
    const tempCategories = [];
    categories.forEach(category => {
        if (closetItems.find(closetItem => closetItem.categoryId === category.categoryId) !== undefined) {
            tempCategories.push(category);
        }
    });
    return tempCategories;
}

export default function ClosetScreen({
                                         editMode = false,
                                         menuOpen,
                                         isInjected = false,
                                         injectedItemTapFunc
                                     }) {

    const getClosetApi = useApi(outfitApi.getCloset);
    const deleteClosetApi = useApi(outfitApi.deleteItem);

    const onRefresh = () => {
        getClosetApi.request();
    };

    useEffect(() => {
        getClosetApi.request();
    }, []);

    const deleteFromCloset = (id, isModal = false, callBackFunc) => {
        Alert.alert("Confirm deletion:", "Are you sure you want to delete this item?", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: async () => {
                    if (getClosetApi.data.find(item => item.id === id)) {
                        const result = await deleteClosetApi.request(id);

                        if (!result.ok) {
                            return alert(result.data?.message ? result.data.message : "Something went wrong.");
                        }

                        getClosetApi.setData(getClosetApi.data.filter(item => item.id !== id));

                        callBackFunc();
                    }
                    if (isModal) setModalIsShown(false);
                },
            },
        ]);
    }

    const itemTap = (data, state, isShown) => {
        if (isInjected) {
            injectedItemTapFunc(data);
        } else {
            setModalData(data);
            setModalState(state);
            setModalIsShown(isShown);
        }
    }

    const addToCloset = async (item) => {
        console.log(item);
        const tempClosetItems = getClosetApi.data;
        const index = tempClosetItems.findIndex(items => items.id === item.id);
        if (index !== -1) {
            tempClosetItems[index] = item;

            setProgress(0);
            setUploadVisible(true);
            const result = await outfitApi.putItem(
                item,
                (progress) => setProgress(progress)
            );

            if (!result.ok) {
                // Deletes the base64 from the response
                const temp = result;
                delete temp.config;
                console.log(temp);
                setUploadVisible(false);
                return alert(result.data.message ? result.data.message : "Something went wrong.");
            }

            getClosetApi.setData([...tempClosetItems]);
        } else {
            setProgress(0);
            setUploadVisible(true);
            const result = await outfitApi.postItem(
                item,
                (progress) => setProgress(progress)
            );

            if (!result.ok) {
                // Deletes the base64 from the response
                const temp = result;
                delete temp.config;
                console.log(temp);
                setUploadVisible(false);
                return alert(result.data.message ? result.data.message : "Something went wrong.");
            }

            getClosetApi.setData([...tempClosetItems, item]);
        }
    }

    const [activeSection, setActiveSection] = useState([]);

    // Popup visible
    const [modalIsShown, setModalIsShown] = useState(false);

    // Data from item for popup
    const [modalData, setModalData] = useState({});

    // Data from item for popup
    const [modalState, setModalState] = useState(2);

    // Height of closet container
    //const [containerHeight, setContainerHeight] = useState(500);

    // Upload
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);


    const carousels = useRef(categories.map(() => createRef()));

    const goToLast = (index, indexOfLast) => {
        const current = carousels.current[index].current;
        if(Platform.OS === "android" && current.currentIndex === 0)
        current.snapToItem(indexOfLast, false, false);
    }


    // Renders panel header (always shown)
    const _renderHeader = section => {
        return (
            <View style={styles.sectionHeader}>
                <ImageBackground source={section.url} resizeMode={'cover'}
                                 style={styles.sectionHeaderBackground}>
                    <View
                        style={[styles.sectionHeaderBackgroundOpacity, /*{paddingVertical: containerHeight !== 0 ? ((containerHeight / categories.length) - 26) / 2 : 25}*/]}>
                        <Text style={styles.sectionHeaderText}>{section.title}</Text>
                        <View style={styles.sectionHeaderIcon}>
                            <MaterialCommunityIcons
                                name={'chevron-down'}
                                size={30}
                                color={colors.light}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    //Renders panel content
    const _renderContent = (section, index) => {
        const carouselItems = getClosetApi.data.filter(item => item.categoryId === section.categoryId);
        return (
            <View
                style={carouselItems.length ? styles.sectionContent : [styles.sectionContent, styles.sectionContentRel]}>
                {!isInjected && <TouchableOpacity onPress={() => {
                    itemTap({categoryId: section.categoryId}, 3, true);
                }}>
                    <View style={carouselItems.length ? [styles.newItem, Platform.OS === "android" ? {left: null, right: 20} : null] : [styles.newItem, styles.newItemRel]}>
                        <MaterialCommunityIcons
                            name="plus"
                            color={colors.white}
                            style={styles.newItemIcon}
                            size={70}/>
                    </View>
                </TouchableOpacity>}
                {!isInjected && carouselItems.length ? (
                    <TouchableWithoutFeedback onPress={() => {
                        itemTap({categoryId: section.categoryId}, 3, true);
                    }} style={{zIndex: 10}}>
                        <View style={styles.newItemOverlay}>
                        </View>
                    </TouchableWithoutFeedback>
                ) : null}
                <Carousel
                    data={carouselItems}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width - 10}
                    itemWidth={200}
                    layout={'stack'}
                    layoutCardOffset={100}
                    ref={carousels.current[index]}
                    key={index}
                    onLayout={(event) => {
                        goToLast(index, carouselItems.length -1);
                    }}
                    containerCustomStyle={{zIndex: 1}}
                />
            </View>
        );
    };

    // Renders carousel item
    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity onPress={() => {
                itemTap(item, 2, true);
            }}>
                <OutfitItem state={0} data={item} editMode={editMode} deleteFunc={deleteFromCloset}/>
            </TouchableOpacity>
        )
    }

    // Renders whole screen
    return (
        <View style={isInjected ? {height: (filterCategories(categories, getClosetApi.data).length * 100 + activeSection.length * 225)} : {flex: 1}}>
            <UploadScreen
                onDone={() => setUploadVisible(false)}
                progress={progress}
                visible={uploadVisible}
            />
            <ActivityIndicator visible={getClosetApi.loading || deleteClosetApi.loading}/>
            <Screen>
                <ScrollView
                    style={[styles.container, {marginTop: menuOpen ? (Platform.OS === "ios" ? 110 : 0) : (Platform.OS === "ios" ? 0 : -20),}, isInjected ? {
                        margin: 0,
                        marginTop: 0,
                        borderRadius: 5,
                    } : null]}
                    /*onLayout={(event) => {
                        const {height} = event.nativeEvent.layout;
                        console.log("height", height);
                        setContainerHeight(height);
                    }}*/ refreshControl={
                    <RefreshControl
                        refreshing={getClosetApi.loading}
                        onRefresh={onRefresh}
                        colors={[colors.light]}
                        tintColor={colors.light}
                    />}
                >
                    <Accordion
                        sections={isInjected ? filterCategories(categories, getClosetApi.data) : categories}
                        activeSections={activeSection}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={newActiveSection => setActiveSection(newActiveSection)}
                        underlayColor={'rgba(0,0,0,0.3)'}
                        sectionContainerStyle={styles.sectionContainer}
                    />
                </ScrollView>
                {/*{!isInjected && <ModalLike
                    isVisible={modalIsShown}
                    onBackdropPress={() => setModalIsShown(false)}>
                    <OutfitItem data={modalData} setDataFunc={setModalData} state={modalState}
                                setStateFunc={setModalState} modalCloseFunc={setModalIsShown}
                                deleteFunc={deleteFromCloset} addFunc={addToCloset}/>
                </ModalLike>}*/}
                {!isInjected && <Modal
                    isVisible={modalIsShown}
                    onBackdropPress={() => setModalIsShown(false)}>
                    <OutfitItem data={modalData} setDataFunc={setModalData} state={modalState}
                                setStateFunc={setModalState} modalCloseFunc={setModalIsShown}
                                deleteFunc={deleteFromCloset} addFunc={addToCloset}/>
                </Modal>}
            </Screen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    sectionHeader: {
        width: '100%',
        position: 'relative',
        height: 100,
    },
    sectionHeaderBackground: {
        width: '100%',
        height: '100%',
    },
    sectionHeaderBackgroundOpacity: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: "center",
        alignItems: "center",
    },
    sectionHeaderText: {
        color: colors.light,
        fontSize: 26,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    sectionHeaderIcon: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 40,
        justifyContent: 'center',
    },
    sectionContent: {
        paddingTop: 25,
        paddingBottom: 25,
    },
    sectionContentRel: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 40,
    },
    text: {
        color: colors.lighter,
        fontSize: 24,
        textAlign: 'center',
    },
    newItem: {
        width: 140,
        height: 140,
        backgroundColor: 'rgba(255,255,255,0.6)',
        borderRadius: 5,
        position: "absolute",
        left: 20,
        top: 25,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    newItemRel: {
        position: "relative",
        left: null,
        top: null,
        zIndex: 10,
    },
    newItemOverlay: {
        width: 107,
        height: 140,
        position: "absolute",
        left: 20,
        top: 25,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    newItemIcon: {},
});
