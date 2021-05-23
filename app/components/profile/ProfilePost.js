import React from 'react';
import {View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native'
import Image2 from "../Image";
import {useNavigation} from "@react-navigation/native";
import routes from "../../navigation/routes";

export default function ProfilePost({size, paddingBetweenTiles, data = {}}) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate(routes.POSTDETAIL, {cardData: data});
        }}>
            <View style={[styles.container, {
                width: (size + paddingBetweenTiles),
                height: (size + paddingBetweenTiles),
                paddingBottom: paddingBetweenTiles,
                paddingRight: paddingBetweenTiles
            }]}>
                <Image2
                    style={styles.image}
                    source={{uri: data.images[0].url}}
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
})
