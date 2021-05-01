import client from "./client";

const endpoint = "/collections";

const getCollections = () => client.get(endpoint);

const addCollection = () => {
    const data = {
        "name": "first API collection"
    }

    return client.post(endpoint, data);
};

export default {
    getCollections,
    addCollection
};
