import client from "./client";

const endpoint = "/posts";

const getComments = (post_id) => {
    const tempEndpoint = endpoint + "/" + post_id + "/comments";
    if(isNaN(post_id)) return false;
    return client.get(tempEndpoint);
}

const addComment = (post_id, comment) => {
    const tempEndpoint = endpoint + "/" + post_id + "/comments";
    const data = {
        "comment": comment
    }

    return client.post(tempEndpoint, data);
};

export default {
    getComments,
    addComment
};
