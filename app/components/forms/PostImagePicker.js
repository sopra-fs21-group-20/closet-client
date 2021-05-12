import React, {useEffect, useState} from "react";
import {useFormikContext} from "formik";

import ErrorMessage from "./ErrorMessage";
import PostInputList from "../PostInputList";
import {ScrollView, StyleSheet, View} from "react-native";
import ImageInput from "../ImageInput";

function PostImagePicker({name, picture, hasMultiple = false, forceUpdateFunc = () => {}, forceUpdateVal = 0}) {
    const {errors, setFieldValue, touched, values} = useFormikContext();

    // ToDo

    const [imageUris, setImageUris] = useState(values[name]);

    const handleAdd = (uri) => {
        let newValue;
        if(hasMultiple) newValue = [...imageUris, uri];
        else newValue = [uri];

        setFieldValue(name, newValue);
        setImageUris(newValue);
        forceUpdateFunc(forceUpdateVal + 1);
    };

    const handleRemove = (uri) => {
        const newValue = imageUris.filter((imageUri) => imageUri !== uri);
        setFieldValue(name, newValue);
        setImageUris(newValue);
        forceUpdateFunc(forceUpdateVal + 1);
    };

    return (
        <>
            {hasMultiple && <View>
                <ScrollView
                    horizontal
                    /*onContentSizeChange={() => scrollView.current.scrollToEnd()}*/
                >
                    <View style={styles.container}>
                        {imageUris.map((uri, index) => (
                            <View key={index} style={styles.image}>
                                <ImageInput
                                    onRemoveImage={handleRemove} key={index} name={name}
                                />
                            </View>
                        ))}
                        <ImageInput onAddImage={handleAdd} name={name}/>
                    </View>
                </ScrollView>
            </View>}
            {!hasMultiple && <View>
                <View style={styles.container}>
                    <View style={styles.image}>
                        <ImageInput
                            onAddImage={handleAdd}
                            onRemoveImage={handleRemove}
                            name={name}
                        />
                    </View>
                </View>
            </View>}
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
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

export default PostImagePicker;
