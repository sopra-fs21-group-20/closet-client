import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native'

export default function ProfilePost({size, paddingBetweenTiles, imageUrl}) {

    return (
        <View style={[styles.container, {
            width: (size + paddingBetweenTiles),
            height: (size + paddingBetweenTiles),
            paddingBottom: paddingBetweenTiles,
            paddingRight: paddingBetweenTiles
        }]}>
            <Image
                style={styles.image}
                source={{uri: imageUrl}}
            />
        </View>

    );
}

const styles = StyleSheet.create({
    container:{

    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
})
