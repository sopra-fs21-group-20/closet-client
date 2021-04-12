import React, {useState} from "react";
import {StyleSheet, Text, Dimensions, View, Image, ScrollView} from "react-native";
import colors from "../../config/colors";


export default function CanvasItems() {

    const clothingItems = {
        items: [{url: '\'../../assets/outfit.jpg\''},
            {url: '\'../../assets/outfit.jpg\''},
            {url: '\'../../assets/outfit.jpg\''},]
    }

    return (
        <ScrollView style={[styles.container]}>
            <View style={styles.list}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.title}>Gucci Belt</Text>
                    <Text style={styles.description}>Amazing Item</Text>
                </View>
            </View>
            <View style={styles.list}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.listInformationText}>Item #2</Text>
                </View>
            </View>
            <View style={styles.list}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.listInformationText}>Item #3</Text>
                </View>
            </View>
            <View style={styles.list}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.listInformationText}>Item #4</Text>
                </View>
            </View>
            <View style={styles.list}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.listInformationText}>Item #5</Text>
                </View>
            </View>
            <View style={styles.list}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.listInformationText}>Item #6</Text>
                </View>
            </View>
            <View style={styles.list}>
                <Image source={require("../../assets/outfit.jpg")} style={styles.listImage}/>
                <View style={styles.listInformation}>
                    <Text style={styles.listInformationText}>Item #7</Text>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        paddingHorizontal: 15,
    },
    list:{
        flex: 1,
        flexDirection:'row',
        marginTop: 10,
        backgroundColor: colors.light,
        height: 70,
        width: '100%',
        borderRadius:20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    listImage: {
        backgroundColor: 'white',
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    listInformation:{
        flex: 1,
        marginLeft: 20
    },
    title:{
        color: colors.dark,
        fontSize: 25,
        fontWeight: '600',
        paddingBottom:5
    },
    description:{
        color: colors.dark,
        fontSize: 18
    },

});
