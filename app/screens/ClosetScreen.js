import React, {useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useHeaderHeight} from '@react-navigation/stack';

import Screen from "../components/Screen";
import colors from "../config/colors";
import Carousel, {Pagination} from "react-native-snap-carousel";
import Accordion from "react-native-collapsible/Accordion";
import defaultStyles from "../config/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function ClosetScreen({route}) {
    let menuOpen = route.params?.menuOpen;

    const SECTIONS = [
        {
            title: 'First',
            content: 'Lorem ipsum...',
        },
        {
            title: 'Second',
            content: 'Lorem ipsum...',
        },
    ];

    const closet = [
        {
            title: "Headwear",
            activeItem: 0,
            carouselItems: [
                {
                    title: "Jeans",
                    text: "Armani",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Joggers",
                    text: "Nike",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Jeans",
                    text: "Carhardt",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Shorts",
                    text: "Pull&Bear",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Jeans",
                    text: "Pull&Bear",
                    imageUrl: "jacket.jpg",
                },
            ]
        },
        {
            title: "Jackets",
            activeItem: 0,
            carouselItems: [
                {
                    title: "Jeans",
                    text: "Armani",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Joggers",
                    text: "Nike",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Jeans",
                    text: "Carhardt",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Shorts",
                    text: "Pull&Bear",
                    imageUrl: "jacket.jpg",
                },
                {
                    title: "Jeans",
                    text: "Pull&Bear",
                    imageUrl: "jacket.jpg",
                },
            ]
        },
        {
            title: "T-Shirts",
            activeItem: 0,
            carouselItems: [
                {
                    title: "Jeans",
                    text: "Armani",
                    imageUrl: "jacket.jpg",
                },
            ]
        },
        {
            title: "Pullovers",
            activeItem: 0,
            carouselItems: [
                {
                    title: "Jeans",
                    text: "Armani",
                    imageUrl: "jacket.jpg",
                },
            ]
        },
        {
            title: "Pants",
            activeItem: 0,
            carouselItems: [
                {
                    title: "Jeans",
                    text: "Armani",
                    imageUrl: "jacket.jpg",
                },
            ]
        },
        {
            title: "Footwear",
            activeItem: 0,
            carouselItems: [
                {
                    title: "Jeans",
                    text: "Armani",
                    imageUrl: "jacket.jpg",
                },
            ]
        },
        {
            title: "Underwear",
            activeItem: 0,
            carouselItems: [
                {
                    title: "Jeans",
                    text: "Armani",
                    imageUrl: "jacket.jpg",
                },
            ]
        },
    ];

    const [activeSection, setActiveSection] = useState([]);

    /*const _renderSectionTitle = section => {
        return (
            <View style={styles.sectionTitle}>
                <Text>{section.content}</Text>
            </View>
        );
    };*/

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

    const _renderContent = section => {
        return (
            <View style={styles.sectionContent}>
                <Carousel
                    // ref={() => {}}
                    data={section.carouselItems}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get('window').width - 40}
                    itemWidth={200}
                    layout={'stack'}
                    layoutCardOffset={18}
                    // onSnapToItem={(index) => setActiveItem(index)}
                />
                {/*<Pagination
                        dotsLength={carouselItems.length}
                        activeDotIndex={activeItem}
                        containerStyle={{ backgroundColor: 'rgba(200, 200, 200, 0.75)' }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: 'rgba(255, 255, 255, 0.92)'
                        }}
                        inactiveDotStyle={{
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                    />*/}
            </View>
        );
    };

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.item}>
                {/*<Text style={{fontSize: 30, color: colors.dark}}>{item.title}</Text>
                <Text style={{color: colors.darker}}>{item.text}</Text>*/}
                <Image style={styles.itemImage} source={require('../assets/jacket.jpg')} resizeMode={"cover"}/>
            </View>

        )
    }

    return (
        <Screen>
            <View style={[styles.container, {marginTop: menuOpen ? 100 : 0,}]}>
                <Accordion
                    sections={closet}
                    activeSections={activeSection}
                    // renderSectionTitle={_renderSectionTitle}
                    renderHeader={_renderHeader}
                    renderContent={_renderContent}
                    onChange={newActiveSection => setActiveSection(newActiveSection)}
                    underlayColor={'rgba(0,0,0,0.3)'}
                    sectionContainerStyle={styles.sectionContainer}
                />
            </View>
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
    sectionContainer:{
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
        paddingVertical: 25,
    },
    text: {
        color: colors.lighter,
        fontSize: 24,
        textAlign: 'center',
    },
    item: {
        backgroundColor: 'floralwhite',
        borderRadius: 5,
        height: 160,
        padding: 10,
        marginLeft: 25,
        marginRight: 25,
    },
    itemImage: {
        width: 130,
        height: 140,
    }
});
