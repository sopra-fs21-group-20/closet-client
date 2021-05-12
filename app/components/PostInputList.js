import React, {useRef} from "react";
import {View, StyleSheet, ScrollView, Dimensions} from "react-native";
import ImageInput from "./ImageInput";

function PostInputList({imageUris = [], onRemoveImage, onAddImage, hasMultiple}) {
    const scrollView = useRef();

    if (hasMultiple) {
        return (
            <View>
                <ScrollView
                    ref={scrollView}
                    horizontal
                    /*onContentSizeChange={() => scrollView.current.scrollToEnd()}*/
                >
                    <View style={styles.container}>
                        {imageUris.map((uri, index) => (
                            <View key={index} style={styles.image}>
                                <ImageInput
                                    imageUri={uri}
                                    onRemoveImage={onRemoveImage}
                                />
                            </View>
                        ))}
                        <ImageInput onAddImage={onAddImage}/>
                    </View>
                </ScrollView>
            </View>
        );
    } else {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.image}>
                        <ImageInput
                            imageUri={imageUris[0]?.uri ? imageUris[0].uri : null}
                            onAddImage={onAddImage}
                            onRemoveImage={onRemoveImage}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        marginRight: 10,
        zIndex: 10,
    },
});

export default PostInputList;
