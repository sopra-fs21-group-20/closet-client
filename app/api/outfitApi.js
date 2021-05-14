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

export default {
    getOutfits,
    addOutfit,
    getCloset
};
