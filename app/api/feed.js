import client from "./client";

const endpoint = "/posts";

const getFeed = () => client.get(endpoint);

const addFeedItem = (feedItem, user, onUploadProgress) => {
    return client.post(endpoint, feedItem, {
            onUploadProgress: (progress) =>
                onUploadProgress(progress.loaded / progress.total),
        }
    );
};

const likePost = (post_id) => client.post(endpoint + "/" + post_id + "/like");

const dislikePost = (post_id) => client.post(endpoint + "/" + post_id + "/dislike")

const getPostPoll = (post_id) => client.get(endpoint + "/" + post_id + "/poll")

export default {
    addFeedItem,
    getFeed,
    likePost,
    dislikePost,
    getPostPoll
};
