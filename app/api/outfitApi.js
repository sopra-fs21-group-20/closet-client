import client from "./client";

const endpoint = "/outfits";

const getOutfits = () => client.get(endpoint);

const getCloset = () => client.get("/users/closet");

const addOutfit = (outfit, onUploadProgress) => {

    return client.post(endpoint, outfit, {
            onUploadProgress: (progress) =>
                onUploadProgress(progress.loaded / progress.total),
        }
    );
};

const postItem = (item, onUploadProgress) => {
    return client.post("/items", item, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
}

const putItem = (item, onUploadProgress) => {
    return client.put("/items/" + item.id, item, {
        onUploadProgress: (progress) =>
            onUploadProgress(progress.loaded / progress.total),
    });
}

const deleteItem = (id) => {
    return client.delete("/items/" + id);
}

export default {
    getOutfits,
    addOutfit,
    getCloset,
    postItem,
    putItem,
    deleteItem,
};
