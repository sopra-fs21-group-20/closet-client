import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import colors from "../config/colors";
import routes from "./routes";
import Text from "../components/Text";

function OutfitDropdown({navigation, isOpenChanged}) {
    const dropdownOptions = [{
        title: "Closet",
        navigateTo: routes.CLOSET
    }, {
        title: "Mirror",
        navigateTo: routes.MIRROR
    }];

    const [isOpen, setIsOpen] = useState(false);
    const [activeOption, setActiveOption] = useState(dropdownOptions[0]);

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    setIsOpen(!isOpen);
                    isOpenChanged(!isOpen);
                }}
                style={styles.container}
            >
                <View style={styles.title}>
                    <Text style={styles.text}>{activeOption.title}</Text>
                    <View style={styles.iconWrap}>
                        <MaterialCommunityIcons
                            name={isOpen ? 'chevron-up' : 'chevron-down'}
                            color={'rgba(255, 255, 255, 0.7)'}
                            size={28}
                        />
                    </View>
                </View>
                <View style={[styles.dropDown, {display: isOpen ? "flex": "none"}]} >
                    {
                        dropdownOptions.map(({navigateTo, title}, index) =>
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate(navigateTo)}>
                                <Text style={styles.text}>{title}</Text>
                            </TouchableWithoutFeedback>)
                    }
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
