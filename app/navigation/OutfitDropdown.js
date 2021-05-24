import React, {useEffect, useRef, useState} from "react";
import {View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Platform} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useRoute} from '@react-navigation/native';

import colors from "../config/colors";
import routes from "./routes";
import Text from "../components/Text";
import {Tooltip} from "react-native-elements";

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

    const tooltipRef = useRef(null);

    useEffect(() => {
        tooltipRef.current.toggleTooltip();
    }, []);

    const toggleNav = () => {
        if (route.name !== routes.CREATEOUTFIT) {
            setTimeout(() => {
                setIsOpen(!isOpen);
            }, 0);
        }
    }

    const [hasBeenTooltip, setHasBeenTooltip] = useState(false);


    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    toggleNav();
                }}
                style={[styles.container, Platform.OS === "android" && isOpen ? {top: 0} : null]}
            >
                <View style={[styles.title, route.name !== routes.CREATEOUTFIT ? {paddingLeft: 0} : null]}>
                    <Text
                        style={styles.text}>{route.name === routes.CREATEOUTFIT ? "New Outfit" : route.name}</Text>
                    {route.name !== routes.CREATEOUTFIT && <View style={styles.iconWrap}>

                        <MaterialCommunityIcons
                            name={isOpen ? 'chevron-up' : 'chevron-down'}
                            color={'rgba(255, 255, 255, 0.7)'}
                            size={28}
                        />
                    </View>}
                </View>
                <Tooltip
                    popover={<Text>Press here to get to the mirror where you can compose your outfits!</Text>}
                    ref={tooltipRef}
                    overlayColor='rgba(0,0,0,0.85)'
                    width={250}
                    height={120}
                    toggleAction='onLongPress'
                    /*onClose={() => {
                        toggleNav();
                    }}*/
                >
                    <View style={styles.tooltipped}>
                        <Text></Text>
                    </View>
                </Tooltip>
                <View style={[styles.dropDown, Platform.OS === "ios" ? {
                    position: "absolute",
                    top: "150%",
                } : null]}>
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
        zIndex: 2,
    },
    dropDown: {
        zIndex: 100,
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
    },
    tooltipped: {
        position: "absolute",
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        zIndex: 1,
    },
});

export default OutfitDropdown;
