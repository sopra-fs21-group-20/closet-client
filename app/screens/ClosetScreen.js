import React, {useEffect, useState} from "react";
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Modal from 'react-native-modal';

import Screen from "../components/Screen";
import colors from "../config/colors";
import Carousel, {Pagination} from "react-native-snap-carousel";
import Accordion from "react-native-collapsible/Accordion";
import defaultStyles from "../config/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import OutfitItem from "../components/OutfitItem";
import fabrics from "../config/fabrics";
import categories from "../config/categories";
import useApi from "../hooks/useApi";
import outfitApi from "../api/outfitApi";
import ModalLike from "../components/ModalLike";
import ActivityIndicator from "../components/ActivityIndicator";

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
                                         navigation,
                                         editMode = false,
                                         menuOpen = false,
                                         isInjected = false,
                                         injectedItemTapFunc
                                     }) {

    const closetApi = useApi(outfitApi.getCloset);

    useEffect(() => {
        closetApi.request();
    }, []);

    /*const closet = [
        {
            id: 0,
            categoryId: 4,
            name: "Jeans",
            brand: "Armani",
            attributes: {
                color: "marineblue",
                fabric: fabrics.DENIM,
            },
            signedUrl: "https://img01.ztat.net/article/spp-media-p1/c13f661615af36ebb5cbacd662f10719/81535596902346689bfd3ac5de2ebddf.jpg?imwidth=765&filter=packshot",
        },
        {
            id: 1,
            categoryId: 4,
            name: "Joggers",
            brand: "Nike",
            attributes: {
                color: "lightgrey",
                fabric: fabrics.WOOL,
            },
            signedUrl: "https://cdn-img.prettylittlething.com/d/9/a/a/d9aad4733cf939f38dafaa3a2f27cd8300df4ea5_CLW0864_3.JPG",
        },
        {
            id: 2,
            categoryId: 4,
            name: "Jeans",
            brand: "Carhardt",
            attributes: {
                color: "ultramarine",
                fabric: fabrics.DENIM,
            },
            signedUrl: "https://cdn.skatedeluxe.com/thumb/tJv6tn26l8Ds_vgese0QoUdV3XI=/fit-in/420x490/filters:fill(white):brightness(-4)/product/112940-1-CarharttWIP-WPiercePantMaverick.jpg",
        },
        {
            id: 3,
            categoryId: 4,
            name: "Shorts",
            brand: "Pull&Bear",
            attributes: {
                color: "grey",
                fabric: fabrics.WOOL,
            },
            signedUrl: "https://static.pullandbear.net/2/photos/2021/V/0/2/p/4695/500/802/4695500802_1_1_3.jpg?t=1618923076619",
        },
        {
            id: 4,
            categoryId: 4,
            name: "Jeans",
            brand: "Pull&Bear",
            attributes: {
                color: "ultramarine",
                fabric: fabrics.DENIM,
            },
            signedUrl: "https://static.pullandbear.net/2/photos/2021/V/0/1/p/4681/309/427/4681309427_1_1_3.jpg?t=1618572622717",
        },
        {
            id: 5,
            categoryId: 1,
            name: "Leather Jacket",
            brand: "Armani",
            attributes: {
                color: "black",
                fabric: fabrics.LEATHER,
            },
            signedUrl: "https://www.plein.com/dw/image/v2/BBKQ_PRD/on/demandware.static/-/Sites-plein-master-catalog/default/dwd79b4722/images/large/A17C-MLB0255-PLE046C_02_sf.jpg?sw=603&sh=768",
        },
        {
            id: 6,
            categoryId: 3,
            name: "Hoodie",
            brand: "Hollister",
            attributes: {
                color: "black",
                fabric: fabrics.WOOL,
            },
            signedUrl: "https://img01.ztat.net/article/spp-media-p1/81884809114745e1a95320958231ae31/e6dfeb1165834e6aaff00ad40a8fff41.jpg?imwidth=1800&filter=packshot",
        },
    ];*/

    //const [closetItems, setClosetItems] = useState(closet);

    const deleteFromCloset = (id, isModal = false) => {
        Alert.alert("Confirm deletion:", "Are you sure you want to delete this item?", [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    if (closetApi.data.find(item => item.id === id)) closetApi.setData(closetApi.data.filter(item => item.id !== id));
                    if (isModal) {
                        setModalIsShown(false);
                    }
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

    const addToCloset = (item) => {
        const tempClosetItems = closetItems;
        const index = tempClosetItems.findIndex(items => items.id === item.id);
        if (index !== -1) {
            tempClosetItems[index] = item;
            setClosetItems([...tempClosetItems]);
        } else {
            setClosetItems(closetItems => [...closetItems, item]);
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
    const _renderContent = section => {
        const carouselItems = closetApi.data.filter(item => item.categoryId === section.categoryId);
        return (
            <View
                style={carouselItems.length ? styles.sectionContent : [styles.sectionContent, styles.sectionContentRel]}>
                {!isInjected && <TouchableOpacity onPress={() => {
                    itemTap({}, 3, true);
                }}>
                    <View style={carouselItems.length ? styles.newItem : [styles.newItem, styles.newItemRel]}>
                        <MaterialCommunityIcons
                            name="plus"
                            color={colors.white}
                            style={styles.newItemIcon}
                            size={70}/>
                    </View>
                </TouchableOpacity>}
                {!isInjected && carouselItems.length ? (
                    <TouchableOpacity onPress={() => {
                        itemTap({}, 3, true);
                    }} style={{zIndex: 10}}>
                        <View style={styles.newItemOverlay}>
                        </View>
                    </TouchableOpacity>
                ) : null}
                <Carousel
                    data={carouselItems}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width - 10}
                    itemWidth={200}
                    layout={'stack'}
                    layoutCardOffset={100}
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
        <View style={isInjected ? {height: (filterCategories(categories, closetApi.data).length * 100 + activeSection.length * 225)} : {flex: 1}}>
            <ActivityIndicator visible={closetApi.loading}/>
            <Screen>
                <ScrollView
                    style={[styles.container, {marginTop: menuOpen ? 110 : 0,}, isInjected ? {
                        margin: 0,
                        marginTop: 0,
                        borderRadius: 5,
                    } : null]}
                    /*onLayout={(event) => {
                        const {height} = event.nativeEvent.layout;
                        console.log("height", height);
                        setContainerHeight(height);
                    }}*/
                >
                    <Accordion
                        sections={filterCategories(categories, closetApi.data)}
                        activeSections={activeSection}
                        renderHeader={_renderHeader}
                        renderContent={_renderContent}
                        onChange={newActiveSection => setActiveSection(newActiveSection)}
                        underlayColor={'rgba(0,0,0,0.3)'}
                        sectionContainerStyle={styles.sectionContainer}
                    />
                </ScrollView>
                {!isInjected && <ModalLike
                    isVisible={modalIsShown}
                    onBackdropPress={() => setModalIsShown(false)}>
                    <OutfitItem data={modalData} setDataFunc={setModalData} state={modalState}
                                setStateFunc={setModalState} modalCloseFunc={setModalIsShown}
                                deleteFunc={deleteFromCloset} addFunc={addToCloset}/>
                </ModalLike>}
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
        paddingTop: 25,
        paddingBottom: 25,
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
    },
    newItemRel: {
        position: "relative",
        left: null,
        top: null,
    },
    newItemOverlay: {
        width: 107,
        height: 140,
        backgroundColor: 'transparent',
        position: "absolute",
        left: 20,
        top: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    newItemIcon: {},
});
