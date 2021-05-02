import React, { useRef } from "react";
import {View, StyleSheet, ScrollView, Dimensions} from "react-native";
import ImageInput from "./ImageInput";

function PostInputList({ imageUris = [], onRemoveImage, onAddImage }) {
    const scrollView = useRef();

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
                                onChangeImage={() => onRemoveImage(uri)}
                            />
                        </View>
                    ))}
                    <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        height: 350,//(Dimensions.get("window").width - 110),
        width: 350,//(Dimensions.get("window").width - 110),
        marginRight: 10,
    },
});

export default PostInputList;
