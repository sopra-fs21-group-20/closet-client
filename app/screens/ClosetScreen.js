import React, {useEffect, useState} from "react";
import {Alert, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useHeaderHeight} from '@react-navigation/stack';

import Screen from "../components/Screen";
import colors from "../config/colors";
import Carousel, {Pagination} from "react-native-snap-carousel";
import Accordion from "react-native-collapsible/Accordion";
import defaultStyles from "../config/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import OutfitItem from "../components/OutfitItem";
import fabrics from "../config/fabrics";

export default function ClosetScreen({editMode, menuOpen}) {
    const categories = [
        {
            categoryId: 0,
            title: "Headwear",
        },
        {
            categoryId: 1,
            title: "Jackets",
        },
        {
            categoryId: 2,
            title: "T-Shirts",
        },
        {
            categoryId: 3,
            title: "Pullovers",
        },
        {
            categoryId: 4,
            title: "Pants",
        },
        {
            categoryId: 5,
            title: "Footwear",
        },
        {
            categoryId: 6,
            title: "Underwear",
        },
    ]
    const closet = [
        {
            id: 0,
            categoryId: 4,
            name: "Jeans",
            brand: "Armani",
            attributes: {
                color: "rgb(54,120,183)",
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
                color: "rgb(224,224,224)",
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
                color: "rgb(50,65,119)",
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
                color: "rgb(145,145,145)",
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
                color: "rgb(55,92,148)",
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
                color: "rgb(33,33,33)",
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
                color: "rgb(33,33,33)",
                fabric: fabrics.WOOL,
            },
            signedUrl: "https://img01.ztat.net/article/spp-media-p1/81884809114745e1a95320958231ae31/e6dfeb1165834e6aaff00ad40a8fff41.jpg?imwidth=1800&filter=packshot",
        },
    ];

    const [closetItems, setClosetItems] = useState(closet);

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
                    if (closetItems.find(item => item.id === id)) setClosetItems(closetItems.filter(item => item.id !== id));
                    if (isModal) {
                        setModalIsShown(false);
                        setModalData(null);
                    }
                },
            },
        ]);
    }

    const addToCloset = (item) => {
        setClosetItems(closetItems => [...closetItems, item]);
    }

    const findById = (array, attr, value) => {
        let index = -1;
        array.forEach((item, i) => {
            if (parseInt(item[attr]) === parseInt(value)) {
                index = i;
            }
        });
        return index;
    };

    const [activeSection, setActiveSection] = useState([]);

    // Popup visible
    const [modalIsShown, setModalIsShown] = useState(false);

    // Data from item for popup
    const [modalData, setModalData] = useState({});

    // Data from item for popup
    const [modalState, setModalState] = useState(3);


    // Renders panel header (always shown)
    const _renderHeader = section => {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
                <View style={styles.sectionHeaderIcon}>
                    <MaterialCommunityIcons
                        name={'chevron-down'}
                        size={30}
                        color={colors.light}
                    />
                </View>
            </View>
        );
    };

    //Renders panel content
    const _renderContent = section => {
        const carouselItems = closetItems.filter(item => item.categoryId === section.categoryId);
        return (
            <View
                style={carouselItems.length ? styles.sectionContent : [styles.sectionContent, styles.sectionContentRel]}>
                <TouchableOpacity onPress={() => {
                    setModalData({});
                    setModalState(3);
                    setModalIsShown(true);
                }}>
                    <View style={carouselItems.length ? styles.newItem : [styles.newItem, styles.newItemRel]}>
                        <MaterialCommunityIcons
                            name="plus"
                            color={colors.white}
                            style={styles.newItemIcon}
                            size={70}/>
                    </View>
                </TouchableOpacity>
                {carouselItems.length ? (
                    <TouchableOpacity onPress={() => {
                        setModalData({});
                        setModalState(3);
                        setModalIsShown(true);
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
                setModalIsShown(true);
                setModalData(item);
                setModalState(2);
            }}>
                <OutfitItem data={item} editMode={editMode} deleteFunc={deleteFromCloset}/>
            </TouchableOpacity>
        )
    }

    // Renders whole screen
    return (
        <Screen>
            <ScrollView style={[styles.container, {marginTop: menuOpen ? 100 : 20,}]}>
                <Accordion
                    sections={categories}
                    activeSections={activeSection}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={newActiveSection => setActiveSection(newActiveSection)}
                    underlayColor={'rgba(0,0,0,0.3)'}
                    sectionContainerStyle={styles.sectionContainer}
                />
            </ScrollView>
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={modalIsShown}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                <OutfitItem data={modalData} state={modalState} modalCloseFunc={setModalIsShown}
                            deleteFunc={deleteFromCloset} addFunc={addToCloset}/>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        borderRadius: 50,
        backgroundColor: colors.medium,
        overflow: 'hidden',
    },
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
    },
    sectionHeader: {
        width: '100%',
        paddingVertical: 25,
    },
    sectionHeaderText: {
        color: colors.light,
        fontSize: 20,
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
        paddingTop: 5,
        paddingBottom: 25,
    },
    sectionContentRel: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
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
