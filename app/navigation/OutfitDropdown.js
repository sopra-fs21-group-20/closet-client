import React, {useEffect, useState} from "react";
import {View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useRoute} from '@react-navigation/native';

import colors from "../config/colors";
import routes from "./routes";
import Text from "../components/Text";

function OutfitDropdown({navigation, setIsOpen, isOpen}) {
    const route = useRoute();
    const dropdownOptions = [{
        title: "Closet",
        navigateTo: routes.CLOSET
    }, {
        title: "Mirror",
        navigateTo: routes.MIRROR
    }];

    useEffect(() => {
        console.log(isOpen);
    }, [isOpen]);


    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    if (route.name !== routes.CREATEOUTFIT) {
                        setIsOpen(!isOpen);
                    }
                }}
                style={styles.container}
            >
                <View style={[styles.title, route.name !== routes.CREATEOUTFIT ? {paddingLeft: 0} : null]}>
                    <Text style={styles.text}>{route.name === routes.CREATEOUTFIT ? "New Outfit" : route.name}</Text>
                    {route.name !== routes.CREATEOUTFIT && <View style={styles.iconWrap}>
                        <MaterialCommunityIcons
                            name={isOpen ? 'chevron-up' : 'chevron-down'}
                            color={'rgba(255, 255, 255, 0.7)'}
                            size={28}
                        />
                    </View>}
                </View>
                <View style={styles.dropDown}>
                    <View style={{display: isOpen ? "flex" : "none"}}>
                        {
                            dropdownOptions.map(({navigateTo, title}, index) =>
                                <TouchableOpacity key={index} onPress={() => {
                                    navigation.navigate(navigateTo);
                                    setIsOpen(false);
                                }}>
                                    <Text style={styles.text}>{title}</Text>
                                </TouchableOpacity>)
                        }
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 31,
    },
    dropDown: {
        position: "absolute",
        top: "150%",
    },
    text: {
        display: 'flex',
        alignItems: 'center',
        color: colors.white,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        fontSize: 28,
        fontWeight: "400"
    },
    iconWrap: {
        marginTop: 2,
        marginLeft: 3
    }
});

export default OutfitDropdown;
