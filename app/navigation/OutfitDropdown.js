import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import colors from "../config/colors";
import routes from "./routes";
import Text from "../components/Text";

function OutfitDropdown() {
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
                    setIsOpen(!isOpen)
                }}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>{activeOption.title}</Text>
                    <View style={styles.iconWrap}>
                        <MaterialCommunityIcons
                            name={isOpen ? 'chevron-up' : 'chevron-down'}
                            color={'rgba(255, 255, 255, 0.7)'}
                            size={28}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
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
