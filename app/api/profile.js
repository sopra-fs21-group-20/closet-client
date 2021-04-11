import client from "./client";
import {useContext} from "react";
import AuthContext from "../auth/context";

const endpoint = "/users/profile";

const getPosts = () => client.get(endpoint);

export default {
    getPosts,
};
