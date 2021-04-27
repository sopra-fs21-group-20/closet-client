import client from "./client";

const endpoint = "/outfits";

const getOutfits = () => client.get(endpoint);

const addOutfit = (feedItem, user, onUploadProgress) => {
    const data = {
        "caption": feedItem.caption,
        "image": feedItem.base64
    }

    return client.post(endpoint, data, {
            onUploadProgress: (progress) =>
                onUploadProgress(progress.loaded / progress.total),
        }
    );
};

const likePost = (post_id) => client.post(endpoint + "/" + post_id + "/like");

export default {
    addFeedItem,
    getFeed,
    likePost
};
