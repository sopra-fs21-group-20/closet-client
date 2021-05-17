import React, {useCallback, useEffect, useState} from "react";
import {Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function Badge({children, type = "", color = "rgb(72,69,69)", onPressFunction, pressable = true}) {
    const [colorString, setColorString] = useState(color);
    const [childrenString, setChildrenString] = useState(children);

    const luminate = string => {
        const rgb = string.replace(/[^\d,]/g, '').split(',');
        const Y = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
        return Y < 128 ? colors.white : colors.dark;
    }

    return (
        <TouchableOpacity onPress={() => {
            if(pressable) onPressFunction();
        }}>
            <View style={[styles.badgeContainer, {opacity: type === "new" ? 0.5 : 1}]}>
                <View style={[styles.badge]}>
                    <Text style={[styles.badgeText]}>
                        {childrenString}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        paddingRight: 5,
    },
    badge: {
        borderRadius: 20,
        backgroundColor: colors.dark,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    badgeText: {
        fontWeight: '700',
        color: colors.white,
        fontSize: 14,
        textAlign: 'center',
    },
});

export default Badge;
