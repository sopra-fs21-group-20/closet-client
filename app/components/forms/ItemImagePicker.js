import React, {useEffect} from "react";
import {useFormikContext} from "formik";

import ErrorMessage from "./ErrorMessage";
import PostInputList from "../PostInputList";

function ItemImagePicker({name, picture}) {
    const {errors, setFieldValue, touched, values} = useFormikContext();
    const imageUris = values[name];

    useEffect(() => {
        ( () => {handleAdd(picture)})();
    }, []);

    const handleAdd = (uri) => {
        console.log("Working");
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

export default ItemImagePicker;
