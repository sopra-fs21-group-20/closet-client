import client from "./client";

const endpoint = "/posts";

const getFeed = () => client.get(endpoint);

export const addFeedItem = (feedItem, user, onUploadProgress) => {
    /*const data = new FormData();
    console.log('anker', data)
    data.append("username", user.sub);
    data.append("caption", feedItem.caption);*/

    const data = {
        "user_id": 1,
        "caption": feedItem.caption,
        "image": feedItem.base64
    }

    return client.post(endpoint, data, {
            onUploadProgress: (progress) =>
                onUploadProgress(progress.loaded / progress.total),
        }
    )

    /*feedItem.images.forEach((image, index) =>
        data.append("images", {
            name: "image" + index,
            type: "image/jpeg",
            uri: image,
        })
    );*/
};

export default {
    addFeedItem,
    getFeed,
};
