import client from "./client";
import {useContext} from "react";
import AuthContext from "../auth/context";

const endpoint = "/users/profile";

const getPosts = () => client.get(endpoint);

const updateProfile = (userDetails, onUploadProgress) =>{
    const data =
        {
            "firstName": userDetails.firstName,
            "lastName": userDetails.lastName,
            "email": userDetails.email,
            "biography": userDetails.bio
        }
    return client.put("/users", data, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    }).then(response => console.log(response.status));
}


export default {
    getPosts,
    updateProfile
};
