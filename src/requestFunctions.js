import {API_VER, APP_KEY, JSON_TYPE, REQUEST_URL, STORES_SEARCH_DISTANCE, STUB_LOCATION} from "./constants";

export const getRecipeList = async (requestString) => {
    const objectToSend = {
        query: requestString,
    };

    const rawResponse = await fetch(`${REQUEST_URL}/${API_VER}/suggestions/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': JSON_TYPE,
            'Ocp-Apim-Subscription-Key': APP_KEY,
        },
        body: JSON.stringify(objectToSend),
    });
    return await rawResponse.json();
};

export const getPictures = async () => {
    const result = await fetch(`${REQUEST_URL}/dish_pictures.json`);
    return await result.json();
};

export const getRecipe = async (id) => {
    const objectToSend = {
        "filters": { "ids": [id.toString()] },
    };

    const rawResponse = await fetch(`${REQUEST_URL}/${API_VER}/search/recipes`, {
        method: 'POST',
        headers: {
            'Content-Type': JSON_TYPE,
            'Ocp-Apim-Subscription-Key': APP_KEY,
        },
        body: JSON.stringify(objectToSend),
    });
    const response = await rawResponse.json();
    return response.results;
};

export const getStoresNearby = async () => {
    const objectToSend = {
        "filters": {
            "locationDistance": {
                "location": STUB_LOCATION,
                "distance": STORES_SEARCH_DISTANCE,
            }
        }
    };

    const rawResponse = await
    fetch(`${REQUEST_URL}/${API_VER}/search/stores`, {
        method: 'POST',
        headers: {
            'Content-Type': JSON_TYPE,
            'Ocp-Apim-Subscription-Key': APP_KEY,
        },
        body: JSON.stringify(objectToSend),
    });
    const response = await rawResponse.json();
    return response.results;
};

export const getProductsByStore = async (storeId) =>
{
    const objectToSend = {"filters": {
            "storeAvailability" : storeId.toString(),
        }
    };

    const rawResponse = await fetch(`${REQUEST_URL}/${API_VER}/search/products`, {
    method: 'POST',
    headers: {
        'Content-Type': JSON_TYPE,
        'Ocp-Apim-Subscription-Key': APP_KEY,
    },
    body: JSON.stringify(objectToSend),
});
    return await rawResponse.json();
};

export const getProductDetailsFromStore = async (storeId, ean) =>
{
    const rawResponse = await fetch(`${REQUEST_URL}/v4/stores/${storeId}/products?ean=${ean}`, {
    method: 'GET',
    headers: {
        'Content-Type': JSON_TYPE,
        'Ocp-Apim-Subscription-Key': APP_KEY,
    }
});
    return await rawResponse.json();
};