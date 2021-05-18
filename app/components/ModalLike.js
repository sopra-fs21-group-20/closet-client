import React from "react";
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";

function ModalLike({isVisible, onBackdropPress, children}) {
    if(isVisible) return (
        <TouchableWithoutFeedback onPress={() => {
            onBackdropPress()
        }}>
            <View style={[styles.backdrop]}>
                <TouchableWithoutFeedback>
                    {children}
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
    else return null;
}

const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        width: Dimensions.get("screen").width,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 0,
        zIndex: 100,
    }
});

export default ModalLike;
