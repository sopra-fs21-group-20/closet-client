import React, {useEffect} from "react";
import {useFormikContext} from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInputList from "../ImageInputList";
import {Camera} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import PostInputList from "../PostInputList";

function PostImagePicker({name, picture}) {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    const imageUris = values[name];

    useEffect(() => {
        ( () => {handleAdd(picture)})();
    }, []);

    const handleAdd = (uri) => {
        setFieldValue(name, [...imageUris, uri]);
    };

    const handleRemove = (uri) => {
        setFieldValue(
            name,
            imageUris.filter((imageUri) => imageUri !== uri)
        );
    };

    return (
        <>
            <PostInputList
                imageUris={imageUris}
                onAddImage={handleAdd}
                onRemoveImage={handleRemove}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default PostImagePicker;
