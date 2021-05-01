import React, {useCallback, useState} from "react";
import {StyleSheet, Text, View} from "react-native";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function Badge({children, type = "", color = "rgb(0,0,0)"}) {
    const luminate = string => {
        const rgb = string.replace(/[^\d,]/g, '').split(',');
        const Y = 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
        return Y < 128 ? colors.white : colors.dark;
    }

    console.log(children);

    return (
        <View style={styles.badgeContainer}>
            <View style={[styles.badge, {backgroundColor: color}]}>
                <Text style={[styles.badgeText, {color: luminate(color)}]}>
                    {children}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        paddingRight: 5,
    },
    badge: {
        borderRadius: 20,
        backgroundColor: colors.primary,
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
