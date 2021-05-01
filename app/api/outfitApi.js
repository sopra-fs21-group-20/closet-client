import client from "./client";

const endpoint = "/outfits";

const getOutfit = () => client.get(endpoint);

const addOutfit = (outfit, onUploadProgress) => {
    const data = {
        "name": outfit.name,
        "items": outfit.items,
        "collectionIds": outfit.collectionIds
    }
    /*{
        "name": "My first BIG outfit",
        "items": [
            {
                "itemId": 10,
                "position": 0
            }
        ],
        "collectionIds": [
            2
        ]
    }*/

    console.log(data)

    return client.post(endpoint, data, {
            onUploadProgress: (progress) =>
                onUploadProgress(progress.loaded / progress.total),
        }
    );
};

export default {
    getOutfit,
    addOutfit
};
