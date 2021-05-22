import React from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions} from "react-native";
import colors from "../../config/colors";
import OutfitItem from "../OutfitItem";
import Button from "../Button";
import {SubmitButton} from "../forms";
import {MaterialCommunityIcons} from "@expo/vector-icons";


export default function CanvasItems({outfit, deleteFunc, isInjected, itemId}) {

    return (
        <View style={[styles.container]}>
            <View style={styles.specs}>
                <Text style={styles.title}>{outfit.name}</Text>
                {!isInjected && <TouchableOpacity onPress={() => {
                    deleteFunc(itemId);
                }}>
                    <View style={styles.deleteIconContainer}>
                        <MaterialCommunityIcons
                            name="trash-can-outline"
                            color={colors.white}
                            size={24}/>
                    </View>
                </TouchableOpacity>}
            </View>
            {outfit.outfitItems.map((item, index) =>
                <OutfitItem state={1} data={item} key={index}/>
            )}

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        paddingVertical: 15,
        backgroundColor: colors.darker,
        borderRadius: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    title: {
        color: colors.white,
        fontSize: 25,
        lineHeight: 40,
        fontWeight: '600',
        height: 40,
        width: Dimensions.get("window").width - 80,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    description: {
        color: colors.white,
        fontSize: 18,
        fontStyle: 'italic'
    },
    specs: {
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteIconContainer: {
        backgroundColor: colors.dark,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
});
