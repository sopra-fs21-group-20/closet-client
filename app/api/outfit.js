import client from "./client";

const endpoint = "/outfits";

const getOutfit = () => client.get(endpoint);

export default {
    getOutfit
};
