import client from "./client";

const endpoint = "/posts";

const getFeed = () => client.get(endpoint);

export const addFeedItem = (feedItem, onUploadProgress) => {
  const data = new FormData();
  data.append("id", feedItem.id);
  data.append("username", feedItem.username);
  data.append("caption", feedItem.caption);
  data.append("likes", feedItem.likes);
  data.append("comments", feedItem.comments);

  feedItem.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addFeedItem,
  getFeed,
};
