import React from "react";
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from "react-native";

function ModalLike({isVisible, onBackdropPress, children}) {
    return (
        <TouchableWithoutFeedback onPress={() => {
            onBackdropPress()
        }}>
            <TouchableWithoutFeedback>
                <View style={[{display: isVisible ? "flex" : "none"}]}>
                    <View style={[styles.backdrop]}>
                        {children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </TouchableWithoutFeedback>
    );
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
    }
});

export default ModalLike;
