import client from "./client";

const endpoint = "/outfits";


const addOutfit = () => () => {
    const data = {
        "name": "API outfit",
        "items": [
            {
                "itemId": 1,
                "position": 0
            }
        ],
        "collectionIds": [
            2
        ]
    }

    /*{
        "name": outfit.name,
        "items": outfit.items,
        "collectionIds": outfit.collectionIds
    }*/

    return client.post(endpoint, data, /*{
            onUploadProgress: (progress) =>
                onUploadProgress(progress.loaded / progress.total),
        }*/
    );
};

export default {
    getOutfit,
    addOutfit
};
